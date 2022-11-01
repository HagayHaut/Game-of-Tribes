export const getNextGen = (civilization: boolean[][]): boolean[][] => {
  const m = civilization.length;
  const n = civilization[0].length;
  const nextGen = Array(m)
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

    return civilization[r][c]
      ? liveNeighbors > 1 && liveNeighbors < 4
      : liveNeighbors === 3;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      nextGen[r][c] = nextCell(r, c);
    }
  }

  return nextGen;
};
