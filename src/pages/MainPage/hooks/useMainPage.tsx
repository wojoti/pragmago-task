import { useState } from "react";

export type Frog = {
  id: number;
  x: number;
  y: number;
  gender: "male" | "female";
  characteristics: string[]; // "tall" | "short" | "fat" | "slim"
};

export const useMainPage = () => {
  const LAKE_WIDTH = 10;
  const LAKE_HEIGHT = 6;
  const [lake, setLake] = useState(() =>
    Array(LAKE_HEIGHT)
      .fill(null)
      .map(() => Array(LAKE_WIDTH).fill(null))
  );
  const [frogs, setFrogs] = useState<Frog[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      gender: "female",
      characteristics: ["short", "slim"],
    },
    {
      id: 2,
      x: 1,
      y: 0,
      gender: "male",
      characteristics: ["tall", "fat"],
    },
  ]);
  const [selectedFrog, setSelectedFrog] = useState<Frog | null>(null);
  const [selectedCell, setSelectedCell] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedParents, setSelectedParents] = useState<Frog[]>([]);
  const isValidJump = (frog: Frog, toX: number, toY: number) => {
    const dx = Math.abs(frog.x - toX);
    const dy = Math.abs(frog.y - toY);
    const isValidDirection =
      dx === dy || // diagonal
      (dx === 0 && dy > 0) || // hertical
      (dy === 0 && dx > 0); // horizontal

    const distance = Math.max(dx, dy);
    const maxDistance = frog.gender === "male" ? 3 : 2;

    return isValidDirection && distance <= maxDistance;
  };
  const getAdjacentCells = (x: number, y: number) => {
    const adjacent = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < LAKE_WIDTH && newY >= 0 && newY < LAKE_HEIGHT) {
          adjacent.push([newX, newY]);
        }
      }
    }
    return adjacent;
  };

  const findEmptyAdjacentCell = (x: number, y: number) => {
    const adjacent = getAdjacentCells(x, y);
    return adjacent.find(
      ([adjX, adjY]) => !frogs.some((f) => f.x === adjX && f.y === adjY)
    );
  };

  const handleCellClick = (x: number, y: number) => {
    const frogAtCell = frogs.find((f) => f.x === x && f.y === y);

    if (frogAtCell) {
      if (selectedParents.length < 2) {
        setSelectedParents([...selectedParents, frogAtCell]);
      } else {
        setSelectedParents([frogAtCell]);
      }
      setSelectedFrog(frogAtCell);
      setSelectedCell(null);
    } else {
      if (selectedParents.length === 2) {
        setSelectedParents([selectedParents[1]]);
      }
      setSelectedCell({ x, y });
    }
  };

  const handleJump = () => {
    if (!selectedFrog || !selectedCell) {
      console.log("Select a frog and destination first");
      return;
    }

    if (!isValidJump(selectedFrog, selectedCell.x, selectedCell.y)) {
      console.log(`Invalid jump distance for ${selectedFrog.gender} frog`);
      return;
    }

    setFrogs(
      frogs.map((f) =>
        f.id === selectedFrog.id
          ? { ...f, x: selectedCell.x, y: selectedCell.y }
          : f
      )
    );

    setSelectedFrog(null);
    setSelectedCell(null);
    setSelectedParents([]);
    console.log("Jump!");
  };

  const handleReproduce = () => {
    if (selectedParents.length !== 2) {
      console.log("Select two parent frogs first");
      return;
    }

    const [parent1, parent2] = selectedParents;
    if (parent1.gender === parent2.gender) {
      console.log("Parents must be of different genders");
      return;
    }

    const mother = parent1.gender === "female" ? parent1 : parent2;
    const father = parent1.gender === "male" ? parent1 : parent2;

    const emptyCell = findEmptyAdjacentCell(mother.x, mother.y);
    if (!emptyCell) {
      console.log("No empty adjacent cells for new frog");
      return;
    }

    const [newX, newY] = emptyCell;
    const heightCharacteristic =
      Math.random() < 0.5
        ? father.characteristics[0]
        : mother.characteristics[0];
    const weightCharacteristic =
      Math.random() < 0.5
        ? father.characteristics[1]
        : mother.characteristics[1];
    const newFrog: Frog = {
      id: Math.max(...frogs.map((f) => f.id)) + 1,
      x: newX,
      y: newY,
      gender: Math.random() < 0.5 ? "male" : "female",
      characteristics: [heightCharacteristic, weightCharacteristic],
    };

    setFrogs([...frogs, newFrog]);
    setSelectedParents([]);
    console.log("New frog born!", emptyCell);
  };

  return {
    isValidJump,
    getAdjacentCells,
    handleCellClick,
    lake,
    setLake,
    handleJump,
    handleReproduce,
    frogs,
    selectedFrog,
    selectedCell,
    selectedParents,
    LAKE_WIDTH,
  };
};
