import Field from "../../components/Field/Field";
import { useMainPage } from "./hooks/useMainPage";

const MainPage = () => {
  const {
    handleCellClick,
    lake,
    frogs,
    selectedFrog,
    selectedCell,
    selectedParents,
    handleJump,
    handleReproduce,
  } = useMainPage();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>
          Below is a lake with dimensions 10x6 fields. Frogs are marked as green
          rectangles. Frog with a small blue rectangle is a male; with a purple
          rectangle female.
        </p>
        <br />
        <strong>Acceptance criteria:</strong>
        <br />
        <ul>
          <li>
            Each frog can jump on an empty field (select the frog, the empty
            field and click the jump button)
          </li>
          <li>A male frog can jump 3 fields (also diagonal)</li>
          <li>A female frog can jump 2 fields (also diagonal)</li>
          <li>
            Each frog should have two characteristics (array of two elements:
            tall, short, fat, slim)
          </li>
          <li>
            Two frogs different genders, adjacent can reproduce (select one frog
            a male, one female and click the reproduce button)
          </li>
          <li>
            The new frog should be placed in the first available space adjacent
            to the mother
          </li>
          <li>
            The new frog should have one characteristic from mother and one from
            father
          </li>
          <li>
            Use ReactJS + if enough time add styling of your choice to solve
            this one.
          </li>
          <li>
            You dont need to use this provided index file or html code but
            overall game rules must be preserved.
          </li>
        </ul>
        <strong>Good Luck :)</strong>
      </div>
      <div className="flex flex-row gap-4">
        <button
          onClick={handleJump}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Jump
        </button>
        <button
          onClick={handleReproduce}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Reproduce
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {lake.map((row, y) => (
          <div key={`row-${y}`} className="flex flex-row gap-1">
            {row.map((_, x) => (
              <Field
                key={`${x}-${y}`}
                frogs={frogs}
                x={x}
                y={y}
                selectedFrog={selectedFrog}
                selectedCell={selectedCell}
                selectedParents={selectedParents}
                handleCellClick={handleCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
