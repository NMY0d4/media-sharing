import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './styles/Skeleton';
import Button from './styles/Button';
import AlbumListItem from './AlbumListItem';

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className='h-10 w-full' times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => (
      <AlbumListItem key={album.id} album={album} />
    ));
  }

  return (
    <div>
      <div className='p-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button
          className='bg-white'
          loading={results.isLoading}
          onClick={handleAddAlbum}
        >
          + Album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
