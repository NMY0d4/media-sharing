import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from '../components/styles/Button';
import Skeleton from './styles/Skeleton';
import useThunk from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

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

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = users.map((user) => <UsersListItem key={user.id} user={user} />);
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {
          <Button loading={isCreatingUser} onClick={handleUserAdd}>
            + Add User
          </Button>
        }
        {creatingUserError && 'Error creating user...'}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
