import { NextGenProp } from '../types/nextGenProp';

export const getNextGen = (civilization: boolean[][]): NextGenProp => {
  const m: number = civilization.length;
  const n: number = civilization[0].length;
  let changed: boolean = false;
  const nextGen: boolean[][] = Array(m)
    .fill([])
    .map(() => Array(n));

  const isIB = (r: number, c: number) => r >= 0 && c >= 0 && r < m && c < n;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  const getLiveNeighbors = (r: number, c: number): number => {
    let liveNeighbors = 0;
    directions.forEach(([dr, dc]) => {
      const [row, col] = [r + dr, c + dc];
      if (isIB(row, col) && civilization[row][col]) {
        liveNeighbors++;
      }
    });
    return liveNeighbors;
  };

  const nextCell = (r: number, c: number): boolean => {
    const liveNeighbors = getLiveNeighbors(r, c);

    const nextCellGen = civilization[r][c]
      ? liveNeighbors > 1 && liveNeighbors < 4
      : liveNeighbors === 3;

    if (nextCellGen !== civilization[r][c]) {
      changed = true;
    }

    return nextCellGen;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      nextGen[r][c] = nextCell(r, c);
    }
  }

  return [changed, nextGen];
};
