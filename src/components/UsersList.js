import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';

function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, users, error } = useSelector((state) => state.storeUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching data...</div>
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}> {user.name}</div>
      ))}
    </div>
  );
}

export default UsersList;
