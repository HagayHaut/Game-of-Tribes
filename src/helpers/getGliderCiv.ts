export const getGliderCiv = (W: number, H: number): boolean[][] => {
  const gliderCiv = Array(H)
    .fill([])
    .map(() =>
      Array(W)
        .fill(false)
        .map(() => false)
    );

  // top left
  gliderCiv[0][1] = true;
  gliderCiv[1][2] = true;
  gliderCiv[2][0] = true;
  gliderCiv[2][1] = true;
  gliderCiv[2][2] = true;

  // bottom left
  gliderCiv[H - 2][0] = true;
  gliderCiv[H - 3][1] = true;
  gliderCiv[H - 3][2] = true;
  gliderCiv[H - 2][2] = true;
  gliderCiv[H - 1][2] = true;

  // top right
  gliderCiv[0][W - 3] = true;
  gliderCiv[1][W - 3] = true;
  gliderCiv[2][W - 3] = true;
  gliderCiv[2][W - 2] = true;
  gliderCiv[1][W - 1] = true;

  // bottom right
  gliderCiv[H - 3][W - 3] = true;
  gliderCiv[H - 3][W - 2] = true;
  gliderCiv[H - 3][W - 1] = true;
  gliderCiv[H - 2][W - 3] = true;
  gliderCiv[H - 1][W - 2] = true;

  return gliderCiv;
};
