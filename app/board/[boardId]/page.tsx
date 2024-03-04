import { FC } from 'react';
import { Canvas, Loading } from './_components';
import { Room } from '@/components/room';

interface Props {
  params: {
    boardId: string;
  };
}

const BoardIdPage: FC<Props> = (props) => {
  const { params } = props;

  return (
    <Room fallback={<Loading />} {...params}>
      <Canvas {...params} />;
    </Room>
  );
};

export default BoardIdPage;
