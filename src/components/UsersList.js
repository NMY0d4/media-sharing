import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from '../components/styles/Button';
import Skeleton from './styles/Skeleton';
import useThunk from '../hooks/use-thunk';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { users } = useSelector((state) => state.storeUsers);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doAddUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className='h-10 w-full' />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = users.map((user) => (
    <div key={user.id} className='mb-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  ));

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {
          <Button loading={isCreatingUser} onClick={handleUserAdd}>
            + Add User
          </Button>
        }
        {creatingUserError && 'Error creating user...'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
