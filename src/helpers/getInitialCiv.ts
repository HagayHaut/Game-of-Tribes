export const getInitialCiv = (W: number, H: number): boolean[][] => {
  return Array(H)
    .fill([])
    .map(() => Array(W).fill(false));
};
