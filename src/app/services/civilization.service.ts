import {
  Cell,
  CellState,
  Civilization,
  Coordinate,
} from '../models/app.states';

export class CivilizationService {
  public width: Coordinate;
  public height: Coordinate;

  constructor(width: Coordinate, height: Coordinate) {
    this.width = width;
    this.height = height;
  }

  getInitialCiv({ width, height } = this): Civilization {
    const civ: Civilization = [];

    for (let r = 0; r < height; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < width; c++) {
        row.push({ state: 0, coors: [r as Coordinate, c as Coordinate] });
      }
      civ.push(row);
    }
    return civ;
  }

  getRandomCiv({ width, height } = this): Civilization {
    const civ: Civilization = [];

    for (let r = 0; r < height; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < width; c++) {
        const rand = Math.floor(Math.random() * 8);
        row.push({
          state: [1, 2].includes(rand) ? (rand as CellState) : 0,
          coors: [r as Coordinate, c as Coordinate],
        });
      }
      civ.push(row);
    }
    return civ;
  }

  getBoatCiv({ width, height, getInitialCiv } = this): Civilization {
    const boatCiv = getInitialCiv();

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
    boatCiv[h1][w1].state = 1;
    boatCiv[h1 + 1][w1].state = 1;
    boatCiv[h1 + 2][w1].state = 1;
    boatCiv[h1 - 1][w1 + 1].state = 1;
    boatCiv[h1 + 2][w1 + 1].state = 1;
    boatCiv[h1 + 2][w1 + 2].state = 1;
    boatCiv[h1 + 2][w1 + 3].state = 1;
    boatCiv[h1 + 1][w1 + 4].state = 1;
    boatCiv[h1 - 1][w1 + 4].state = 1;

    // bottom left
    boatCiv[h2][w2].state = 2;
    boatCiv[h2 - 1][w2].state = 2;
    boatCiv[h2 - 2][w2].state = 2;
    boatCiv[h2 + 1][w2 + 1].state = 2;
    boatCiv[h2 - 2][w2 + 1].state = 2;
    boatCiv[h2 - 2][w2 + 2].state = 2;
    boatCiv[h2 - 2][w2 + 3].state = 2;
    boatCiv[h2 + 1][w2 + 4].state = 2;
    boatCiv[h2 - 1][w2 + 4].state = 2;

    // top right
    boatCiv[h3][w3].state = 2;
    boatCiv[h3 + 1][w3].state = 2;
    boatCiv[h3 + 2][w3].state = 2;
    boatCiv[h3 - 1][w3 - 1].state = 2;
    boatCiv[h3 + 2][w3 - 1].state = 2;
    boatCiv[h3 + 2][w3 - 2].state = 2;
    boatCiv[h3 + 2][w3 - 3].state = 2;
    boatCiv[h3 + 1][w3 - 4].state = 2;
    boatCiv[h3 - 1][w3 - 4].state = 2;

    // bottom right
    boatCiv[h4][w4].state = 1;
    boatCiv[h4 - 1][w4].state = 1;
    boatCiv[h4 - 2][w4].state = 1;
    boatCiv[h4 + 1][w4 - 1].state = 1;
    boatCiv[h4 - 2][w4 - 1].state = 1;
    boatCiv[h4 - 2][w4 - 2].state = 1;
    boatCiv[h4 - 2][w4 - 3].state = 1;
    boatCiv[h4 + 1][w4 - 4].state = 1;
    boatCiv[h4 - 1][w4 - 4].state = 1;

    return boatCiv;
  }

  getGliderCiv({ width, height, getInitialCiv } = this): Civilization {
    const gliderCiv = getInitialCiv();

    // top left
    gliderCiv[0][1].state = 1;
    gliderCiv[1][2].state = 1;
    gliderCiv[2][0].state = 1;
    gliderCiv[2][1].state = 1;
    gliderCiv[2][2].state = 1;

    // bottom left
    gliderCiv[height - 2][0].state = 2;
    gliderCiv[height - 3][1].state = 2;
    gliderCiv[height - 3][2].state = 2;
    gliderCiv[height - 2][2].state = 2;
    gliderCiv[height - 1][2].state = 2;

    // top right
    gliderCiv[0][width - 3].state = 2;
    gliderCiv[1][width - 3].state = 2;
    gliderCiv[2][width - 3].state = 2;
    gliderCiv[2][width - 2].state = 2;
    gliderCiv[1][width - 1].state = 2;

    // bottom right
    gliderCiv[height - 3][width - 3].state = 1;
    gliderCiv[height - 3][width - 2].state = 1;
    gliderCiv[height - 3][width - 1].state = 1;
    gliderCiv[height - 2][width - 3].state = 1;
    gliderCiv[height - 1][width - 2].state = 1;

    return gliderCiv;
  }

  getPowerColonyCiv({ width, height, getInitialCiv } = this): Civilization {
    const powerColony = getInitialCiv();

    const midW = ~~(width / 2);
    const midH = ~~(height / 2);

    powerColony[midH][midW].state = 1;
    powerColony[midH - 1][midW - 2].state = 2;
    powerColony[midH + 1][midW - 2].state = 1;
    powerColony[midH + 1][midW - 3].state = 2;
    powerColony[midH + 1][midW + 1].state = 1;
    powerColony[midH + 1][midW + 2].state = 2;
    powerColony[midH + 1][midW + 3].state = 1;

    return powerColony;
  }

  getNextGen(prevGen: Civilization): [boolean, Civilization] {
    const m = prevGen.length as Coordinate;
    const n = prevGen[0].length as Coordinate;
    let changed: boolean = false;

    const nextGen: Civilization = this.getInitialCiv({
      width: n,
      height: m,
    } as this);

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

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        const nextCellGen = this.getNextCellGen(
          r as Coordinate,
          c as Coordinate,
          m,
          n,
          prevGen
        );
        if (nextCellGen !== prevGen[r][c] && !changed) changed = true;
        nextGen[r][c] = nextCellGen;
      }
    }

    return [changed, nextGen];
  }

  private getNextCellGen(
    r: Coordinate,
    c: Coordinate,
    m: Coordinate,
    n: Coordinate,
    prevGen: Civilization
  ): Cell {
    const liveNeighborStates = this.getLiveNeighborStates(r, c, m, n, prevGen);

    const nextCellGenIsAlive = prevGen[r][c].state
      ? liveNeighborStates.length > 1 && liveNeighborStates.length < 4
      : liveNeighborStates.length === 3;

    let nextCellGen: Cell = {
      coors: [r, c],
      state: 0,
    };

    if (nextCellGenIsAlive) {
      if (liveNeighborStates.length === 2) {
        nextCellGen.state =
          liveNeighborStates[0] === liveNeighborStates[1]
            ? liveNeighborStates[0]
            : prevGen[r][c].state;
      } else {
        nextCellGen.state = this.getMajorityNeighborState(liveNeighborStates);
      }
      return nextCellGen;
    }

    return nextCellGen;
  }

  private getMajorityNeighborState([a, b, c]: CellState[]): CellState {
    if (a === b || a === c) return a;
    return b;
  }

  private getLiveNeighborStates(
    r: Coordinate,
    c: Coordinate,
    m: Coordinate,
    n: Coordinate,
    prevGen: Civilization
  ): CellState[] {
    let liveNeighborStates: CellState[] = [];
    const isIB = (r: Coordinate, c: Coordinate) =>
      r >= 0 && c >= 0 && r < m && c < n;

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

    directions.forEach(([dr, dc]) => {
      const [row, col] = [r + dr, c + dc];
      if (
        isIB(row as Coordinate, col as Coordinate) &&
        prevGen[row][col].state
      ) {
        liveNeighborStates.push(prevGen[row][col].state);
      }
    });

    return liveNeighborStates;
  }
}
