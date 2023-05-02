import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './styles/Button';
import Skeleton from './styles/Skeleton';
import PhotoListItem from './PhotosListItem';

function PhotosList({ album }) {
  useFetchPhotosQuery(album);
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation(album);

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;

  if (isFetching) {
    content = <Skeleton className='h-8 w-8' times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo) => (
      <PhotoListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + add Photo
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default PhotosList;
