import clsx from 'clsx';

interface SectionDividerProps {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  className?: string;
}

export function Divider({
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  className,
}: SectionDividerProps) {
  return (
    <div
      className={clsx(
        'divider-wrapper',
        'flex items-center gap-4',
        className
      )}
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
      }}
    >
      <div className="flex-1 h-px bg-white opacity-50" />
    </div>
  );
}