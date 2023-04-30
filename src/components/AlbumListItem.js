import React from 'react';
import ExpandablePanel from './ExpandablePanel';
import Button from './styles/Button';
import { GoTrashcan } from 'react-icons/go';

function AlbumListItem({ album }) {
  const header = <div>
  <Button onClick={}><GoTrashcan/></Button>
  {album.title}
  </div>;
  return (
    <ExpandablePanel header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
}

export default AlbumListItem;
