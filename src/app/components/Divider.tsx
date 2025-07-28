import clsx from 'clsx';

interface SectionDividerProps {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export function Divider({
  marginTop = 48,
  marginBottom = 0,
  marginLeft = 20,
  marginRight = 20,
}: SectionDividerProps) {
  return (
    <div
      className={clsx('divider-wrapper', 'flex items-center gap-4')}
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