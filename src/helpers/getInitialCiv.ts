export const getInitialCiv = (W: number, H: number): number[][] => {
  return Array(H)
    .fill([])
    .map(() => Array(W).fill(0));
};
