export class CivilizationService {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getInitialCiv({ width, height } = this): number[][] {
    return Array(height)
      .fill([])
      .map((_) => Array(width).fill(0));
  }

  getRandomCiv({ width, height } = this): number[][] {
    return Array(height)
      .fill([])
      .map(() =>
        Array(width)
          .fill(0)
          .map(() => {
            const rand: number = Math.floor(Math.random() * 8);
            return [1, 2].includes(rand) ? rand : 0;
          })
      );
  }

  getBoatCiv({ width, height } = this): number[][] {
    const boatCiv = Array(height)
      .fill([])
      .map(() =>
        Array(width)
          .fill(0)
          .map(() => 0)
      );

    // make anchors

    // top-left -> h1, w1
    // bottom-left -> h2, w2
    // top-right -> h3, w3
    // bottom-right -> h4, w4

    const [h1, w1] = [5, 5];
    const [h2, w2] = [height - 6, 5];
    const [h3, w3] = [5, width - 6];
    const [h4, w4] = [height - 6, width - 6];

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
    boatCiv[h3][w3] = 2;
    boatCiv[h3 + 1][w3] = 2;
    boatCiv[h3 + 2][w3] = 2;
    boatCiv[h3 - 1][w3 - 1] = 2;
    boatCiv[h3 + 2][w3 - 1] = 2;
    boatCiv[h3 + 2][w3 - 2] = 2;
    boatCiv[h3 + 2][w3 - 3] = 2;
    boatCiv[h3 + 1][w3 - 4] = 2;
    boatCiv[h3 - 1][w3 - 4] = 2;

    // bottom right
    boatCiv[h4][w4] = 1;
    boatCiv[h4 - 1][w4] = 1;
    boatCiv[h4 - 2][w4] = 1;
    boatCiv[h4 + 1][w4 - 1] = 1;
    boatCiv[h4 - 2][w4 - 1] = 1;
    boatCiv[h4 - 2][w4 - 2] = 1;
    boatCiv[h4 - 2][w4 - 3] = 1;
    boatCiv[h4 + 1][w4 - 4] = 1;
    boatCiv[h4 - 1][w4 - 4] = 1;

    return boatCiv;
  }

  getGliderCiv({ width, height } = this): number[][] {
    const gliderCiv = Array(height)
      .fill([])
      .map(() =>
        Array(width)
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
    gliderCiv[height - 2][0] = 2;
    gliderCiv[height - 3][1] = 2;
    gliderCiv[height - 3][2] = 2;
    gliderCiv[height - 2][2] = 2;
    gliderCiv[height - 1][2] = 2;

    // top right
    gliderCiv[0][width - 3] = 2;
    gliderCiv[1][width - 3] = 2;
    gliderCiv[2][width - 3] = 2;
    gliderCiv[2][width - 2] = 2;
    gliderCiv[1][width - 1] = 2;

    // bottom right
    gliderCiv[height - 3][width - 3] = 1;
    gliderCiv[height - 3][width - 2] = 1;
    gliderCiv[height - 3][width - 1] = 1;
    gliderCiv[height - 2][width - 3] = 1;
    gliderCiv[height - 1][width - 2] = 1;

    return gliderCiv;
  }

  getPowerColonyCiv({ width, height } = this): number[][] {
    const powerColony = Array(height)
      .fill([])
      .map(() =>
        Array(width)
          .fill(0)
          .map(() => 0)
      );

    const midW = ~~(width / 2);
    const midH = ~~(height / 2);

    powerColony[midH][midW] = 1;
    powerColony[midH - 1][midW - 2] = 2;
    powerColony[midH + 1][midW - 2] = 1;
    powerColony[midH + 1][midW - 3] = 2;
    powerColony[midH + 1][midW + 1] = 1;
    powerColony[midH + 1][midW + 2] = 2;
    powerColony[midH + 1][midW + 3] = 1;

    return powerColony;
  }

  getNextGen(civilization: number[][]): [boolean, number[][]] {
    const m: number = civilization.length;
    const n: number = civilization[0].length;
    let changed: boolean = false;

    const nextGen: number[][] = Array(m)
      .fill([])
      .map(() => Array(n));

    const isIB = (r: number, c: number) => r >= 0 && c >= 0 && r < m && c < n;

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];

    const getLiveNeighbors = (r: number, c: number): number[] => {
      let liveNeighbors: number[] = [];
      directions.forEach(([dr, dc]) => {
        const [row, col] = [r + dr, c + dc];
        if (isIB(row, col) && civilization[row][col]) {
          liveNeighbors.push(civilization[row][col]);
        }
      });
      return liveNeighbors;
    };

    const getMajorityNeighbor = ([a, b, c]: number[]): number => {
      if (a === b || a === c) return a;
      return b;
    };

    const nextCell = (r: number, c: number): number => {
      const liveNeighbors: number[] = getLiveNeighbors(r, c);

      const nextCellIsAlive = civilization[r][c]
        ? liveNeighbors.length > 1 && liveNeighbors.length < 4
        : liveNeighbors.length === 3;

      let nextCellGen: number;

      if (nextCellIsAlive) {
        if (liveNeighbors.length === 2) {
          nextCellGen =
            liveNeighbors[0] === liveNeighbors[1]
              ? liveNeighbors[0]
              : civilization[r][c];
        } else {
          nextCellGen = getMajorityNeighbor(liveNeighbors);
        }
        return nextCellGen;
      }

      return 0;
    };

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        const nextCellGen = nextCell(r, c);
        if (nextCellGen !== civilization[r][c] && !changed) changed = true;
        nextGen[r][c] = nextCellGen;
      }
    }

    return [changed, nextGen];
  }
}
