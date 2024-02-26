import { Star } from 'lucide-react';
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer: FC<Props> = (props) => {
  const { title, isFavorite, authorLabel, createdAtLabel, onClick, disabled } =
    props;

  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p
        className="opacity-0 group-hover:opacity-100 transition-opacity
       text-[11px] text-muted-foreground"
      >
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover: text-blue-600',
          disabled && 'cursor-not-allowed opacity-75'
        )}
      >
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  );
};
