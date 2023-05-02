import { GoTrashcan } from 'react-icons/go';
import Button from './styles/Button';
import { removeUser } from '../store';
import useThunk from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className='mr-3' loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      <h3 className='font-semibold'>{user.name}</h3>
    </>
  );

  return (
    <ExpandablePanel className='bg-gray-200 mb-5' header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
