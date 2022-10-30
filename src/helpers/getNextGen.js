export const getNextGen = (civilization) => {
  const m = civilization.length;
  const n = civilization[0].length;
  const nextGen = Array(m)
    .fill()
    .map(() => Array(n));

  const isIB = (r, c) => r >= 0 && c >= 0 && r < m && c < n;

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

  const getLiveNeighbors = (r, c) => {
    let liveNeighbors = 0;
    directions.forEach(([dr, dc]) => {
      const [row, col] = [r + dr, c + dc];
      if (isIB(row, col) && civilization[row][col]) {
        liveNeighbors++;
      }
    });
    return liveNeighbors;
  };

  const nextCell = (r, c) => {
    const liveNeighbors = getLiveNeighbors(r, c);
    if (civilization[r][c]) {
      return liveNeighbors > 1 && liveNeighbors < 4;
    }
    return liveNeighbors === 3;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      nextGen[r][c] = nextCell(r, c);
    }
  }

  return nextGen;
};
