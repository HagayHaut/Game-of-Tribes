export const getGliderCiv = (W: number, H: number): number[][] => {
  const gliderCiv = Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(0)
        .map(() => 0)
    );

  // top left
  gliderCiv[0][1] = 1;
  gliderCiv[1][2] = 1;
  gliderCiv[2][0] = 1;
  gliderCiv[2][1] = 1;
  gliderCiv[2][2] = 1;

  // bottom left
  gliderCiv[H - 2][0] = 2;
  gliderCiv[H - 3][1] = 2;
  gliderCiv[H - 3][2] = 2;
  gliderCiv[H - 2][2] = 2;
  gliderCiv[H - 1][2] = 2;

  // top right
  gliderCiv[0][W - 3] = 2;
  gliderCiv[1][W - 3] = 2;
  gliderCiv[2][W - 3] = 2;
  gliderCiv[2][W - 2] = 2;
  gliderCiv[1][W - 1] = 2;

  // bottom right
  gliderCiv[H - 3][W - 3] = 1;
  gliderCiv[H - 3][W - 2] = 1;
  gliderCiv[H - 3][W - 1] = 1;
  gliderCiv[H - 2][W - 3] = 1;
  gliderCiv[H - 1][W - 2] = 1;

  return gliderCiv;
};
