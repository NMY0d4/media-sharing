import classNames from 'classnames';

function Skeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => <div key={i} />);

  return boxes;
}

export default Skeleton;
