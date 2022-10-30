export const getRandomCiv = (W: number, H: number): boolean[][] => {
  return Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(false)
        .map(() => !Math.floor(Math.random() * 3))
    );
};
