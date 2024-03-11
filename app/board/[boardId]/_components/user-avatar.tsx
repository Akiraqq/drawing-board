import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Hint } from '@/components/hint';

interface Props {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar: FC<Props> = (props) => {
  const { name, borderColor, src, fallback } = props;
  return (
    <Hint label={name || 'Teammate'} sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
