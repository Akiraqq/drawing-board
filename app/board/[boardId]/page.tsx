import { FC } from 'react';
import { Canvas } from './_components';

interface Props {
  params: {
    boardId: string;
  };
}

const BoardIdPage: FC<Props> = (props) => {
  const { params } = props;
  return <Canvas {...params} />;
};

export default BoardIdPage;
