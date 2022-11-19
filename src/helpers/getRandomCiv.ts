export const getRandomCiv = (W: number, H: number): number[][] => {
  return Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(0)
        .map(() => Math.floor(Math.random() * 8))
    );
};
