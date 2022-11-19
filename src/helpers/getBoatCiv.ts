export const getBoatCiv = (W: number, H: number): number[][] => {
  const boatCiv = Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(0)
        .map(() => 0)
    );

  // make anchors

  // top-left -> 1
  // bottom-left -> 2
  // top-right -> 3
  // bottom-right -> 4

  const [h1, w1] = [5, 5];
  const [h2, w2] = [H - 6, 5];
  const [h3, w3] = [5, W - 6];
  const [h4, w4] = [H - 6, W - 6];

  // top left
  boatCiv[h1][w1] = 1;
  boatCiv[h1 + 1][w1] = 1;
  boatCiv[h1 + 2][w1] = 1;
  boatCiv[h1 - 1][w1 + 1] = 1;
  boatCiv[h1 + 2][w1 + 1] = 1;
  boatCiv[h1 + 2][w1 + 2] = 1;
  boatCiv[h1 + 2][w1 + 3] = 1;
  boatCiv[h1 + 1][w1 + 4] = 1;
  boatCiv[h1 - 1][w1 + 4] = 1;

  // bottom left
  boatCiv[h2][w2] = 2;
  boatCiv[h2 - 1][w2] = 2;
  boatCiv[h2 - 2][w2] = 2;
  boatCiv[h2 + 1][w2 + 1] = 2;
  boatCiv[h2 - 2][w2 + 1] = 2;
  boatCiv[h2 - 2][w2 + 2] = 2;
  boatCiv[h2 - 2][w2 + 3] = 2;
  boatCiv[h2 + 1][w2 + 4] = 2;
  boatCiv[h2 - 1][w2 + 4] = 2;

  // top right
  boatCiv[h3][w3] = 1;
  boatCiv[h3 + 1][w3] = 1;
  boatCiv[h3 + 2][w3] = 1;
  boatCiv[h3 - 1][w3 - 1] = 1;
  boatCiv[h3 + 2][w3 - 1] = 1;
  boatCiv[h3 + 2][w3 - 2] = 1;
  boatCiv[h3 + 2][w3 - 3] = 1;
  boatCiv[h3 + 1][w3 - 4] = 1;
  boatCiv[h3 - 1][w3 - 4] = 1;

  // bottom right
  boatCiv[h4][w4] = 2;
  boatCiv[h4 - 1][w4] = 2;
  boatCiv[h4 - 2][w4] = 2;
  boatCiv[h4 + 1][w4 - 1] = 2;
  boatCiv[h4 - 2][w4 - 1] = 2;
  boatCiv[h4 - 2][w4 - 2] = 2;
  boatCiv[h4 - 2][w4 - 3] = 2;
  boatCiv[h4 + 1][w4 - 4] = 2;
  boatCiv[h4 - 1][w4 - 4] = 2;

  return boatCiv;
};
