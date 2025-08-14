interface WinCellProps {
  btnStyles: string;
  accentColor: string;
  matchCell: boolean | undefined;
  iconStyles: string;
  Icon: React.ElementType;
}

const WinCell = ({
  btnStyles,
  accentColor,
  matchCell,
  iconStyles,
  Icon,
}: WinCellProps) => {
  return (
    <button
      className={btnStyles}
      style={{
        backgroundColor: matchCell ? accentColor : "",
      }}
    >
      <Icon
        className={iconStyles}
        currentColor={matchCell ? "var(--color-semi-dark-navy)" : accentColor}
      />
    </button>
  );
};

export default WinCell;
