import * as s from './GridItem.css';

interface GridItemProps {
  color: string;
}

export const GridItem = ({ color }: GridItemProps) => {
  return (
    <div
      className={s.gridItem}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
