export const getPowerColonyCiv = (W: number, H: number): boolean[][] => {
  const powerColony = Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(false)
        .map(() => false)
    );

  const midW = ~~(W / 2);
  const midH = ~~(H / 2);

  powerColony[midH][midW] = true;
  powerColony[midH - 1][midW - 2] = true;
  powerColony[midH + 1][midW - 2] = true;
  powerColony[midH + 1][midW - 3] = true;
  powerColony[midH + 1][midW + 1] = true;
  powerColony[midH + 1][midW + 2] = true;
  powerColony[midH + 1][midW + 3] = true;

  return powerColony;
};
