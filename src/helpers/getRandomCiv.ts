export const getRandomCiv = (W: number, H: number): number[][] => {
  return Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(0)
        .map(() => {
          const rand: number = Math.floor(Math.random() * 8);
          return [1, 2].includes(rand) ? rand : 0;
        })
    );
};
