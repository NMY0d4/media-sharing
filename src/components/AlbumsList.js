import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './styles/Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './styles/Button';
// import { albumsApi } from '../store/apis/albumsApi';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
    console.log(results);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div>Albums for {user.name}</div>
        <Button onClick={handleAddAlbum}>+ Album</Button>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
