export const getNextGen = (civilization: number[][]): [boolean, number[][]] => {
  const m: number = civilization.length;
  const n: number = civilization[0].length;
  let changed: boolean = false;
  const nextGen: number[][] = Array(m)
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

  const getLiveNeighbors = (r: number, c: number): number[] => {
    let liveNeighbors: number[] = [];
    directions.forEach(([dr, dc]) => {
      const [row, col] = [r + dr, c + dc];
      if (isIB(row, col) && civilization[row][col]) {
        liveNeighbors.push(civilization[row][col]);
      }
    });
    return liveNeighbors;
  };

  const getMajorityNeighbor = (neighbors: number[]): number => {
    return neighbors.reduce(
      (a, b, i, arr) =>
        arr.filter((n) => n === a).length >= arr.filter((n) => n === b).length
          ? a
          : b,
      0
    );
  };

  const nextCell = (r: number, c: number): number => {
    const liveNeighbors: number[] = getLiveNeighbors(r, c);

    const nextCellIsAlive = civilization[r][c]
      ? liveNeighbors.length > 1 && liveNeighbors.length < 4
      : liveNeighbors.length === 3;

    let nextCellGen: number;

    if (nextCellIsAlive) {
      if (liveNeighbors.length === 2) {
        nextCellGen =
          liveNeighbors[0] === liveNeighbors[1]
            ? liveNeighbors[0]
            : civilization[r][c];
      } else {
        nextCellGen = getMajorityNeighbor(liveNeighbors);
      }
      return nextCellGen;
    }

    return 0;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      nextGen[r][c] = nextCell(r, c);
    }
  }

  return [changed, nextGen];
};
