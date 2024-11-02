import { Frog } from "../../pages/MainPage/hooks/useMainPage";
import FrogArea from "../FrogArea/FrogArea";

interface IField {
  frogs: Frog[];
  x: number;
  y: number;
  selectedFrog: Frog | null;
  selectedCell: {
    x: number;
    y: number;
  } | null;
  selectedParents: Frog[];
  handleCellClick: (x: number, y: number) => void;
}

const Field = ({
  frogs,
  x,
  y,
  selectedFrog,
  selectedCell,
  selectedParents,
  handleCellClick,
}: IField) => {
  const frog = frogs.find((f) => f.x === x && f.y === y);
  const isSelected =
    selectedFrog &&
    selectedCell &&
    (selectedFrog?.id === frog?.id ||
      (selectedCell?.x === x && selectedCell?.y === y));
  const isParentSelected =
    selectedParents?.length && selectedParents.some((p) => p.id === frog?.id);

  return (
    <div
      onClick={() => handleCellClick(x, y)}
      className={`
      min-w-12 min-h-12 border-2 relative
      ${
        isParentSelected
          ? "border-red-400"
          : isSelected
          ? "border-yellow-400"
          : "border-blue-200"
      }
    `}
    >
      {frog && <FrogArea frog={frog} />}
    </div>
  );
};

export default Field;
