export const getPowerColonyCiv = (W: number, H: number): number[][] => {
  const powerColony = Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(0)
        .map(() => 0)
    );

  const midW = ~~(W / 2);
  const midH = ~~(H / 2);

  powerColony[midH][midW] = 1;
  powerColony[midH - 1][midW - 2] = 1;
  powerColony[midH + 1][midW - 2] = 1;
  powerColony[midH + 1][midW - 3] = 1;
  powerColony[midH + 1][midW + 1] = 1;
  powerColony[midH + 1][midW + 2] = 1;
  powerColony[midH + 1][midW + 3] = 1;

  return powerColony;
};
