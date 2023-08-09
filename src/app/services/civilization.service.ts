import {
  Cell,
  CellState,
  Civilization,
  Coordinate,
  Increment,
} from '../models/app.types';

export class CivilizationService {
  public width: Coordinate;
  public height: Coordinate;

  private _directions: [Increment, Increment][];

  constructor(width: Coordinate, height: Coordinate) {
    this.width = width;
    this.height = height;
    this._directions = [
      // includes diagonal
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];
  }

  getInitialCiv(): Civilization {
    return Array(this.height)
      .fill([])
      .map((_, r) => {
        return Array(this.width)
          .fill({})
          .map((_, c) => {
            return <Cell>{
              state: 0,
              coors: [r, c],
            };
          });
      });
  }

  getRandomCiv({ width, height } = this): Civilization {
    return Array(height)
      .fill([])
      .map((_, r) => {
        return Array(width)
          .fill({})
          .map((_, c) => {
            const rand = Math.floor(Math.random() * 8);
            return <Cell>{
              state: [1, 2].includes(rand) ? rand : 0,
              coors: [r, c],
            };
          });
      });
  }

  getBoatCiv(): Civilization {
    const boatCiv = this.getInitialCiv();

    // make anchors

    // top-left -> h1, w1
    // bottom-left -> h2, w2
    // top-right -> h3, w3
    // bottom-right -> h4, w4

    const [h1, w1] = [5, 5];
    const [h2, w2] = [this.height - 6, 5];
    const [h3, w3] = [5, this.width - 6];
    const [h4, w4] = [this.height - 6, this.width - 6];

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

  getGliderCiv(): Civilization {
    const gliderCiv = this.getInitialCiv();

    // top left
    gliderCiv[0][1].state = 1;
    gliderCiv[1][2].state = 1;
    gliderCiv[2][0].state = 1;
    gliderCiv[2][1].state = 1;
    gliderCiv[2][2].state = 1;

    // bottom left
    gliderCiv[this.height - 2][0].state = 2;
    gliderCiv[this.height - 3][1].state = 2;
    gliderCiv[this.height - 3][2].state = 2;
    gliderCiv[this.height - 2][2].state = 2;
    gliderCiv[this.height - 1][2].state = 2;

    // top right
    gliderCiv[0][this.width - 3].state = 2;
    gliderCiv[1][this.width - 3].state = 2;
    gliderCiv[2][this.width - 3].state = 2;
    gliderCiv[2][this.width - 2].state = 2;
    gliderCiv[1][this.width - 1].state = 2;

    // bottom right
    gliderCiv[this.height - 3][this.width - 3].state = 1;
    gliderCiv[this.height - 3][this.width - 2].state = 1;
    gliderCiv[this.height - 3][this.width - 1].state = 1;
    gliderCiv[this.height - 2][this.width - 3].state = 1;
    gliderCiv[this.height - 1][this.width - 2].state = 1;

    return gliderCiv;
  }

  getPowerColonyCiv(): Civilization {
    const powerColony = this.getInitialCiv();

    const midW = ~~(this.width / 2);
    const midH = ~~(this.height / 2);

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
    let changed = false;

    const nextGen: Civilization = this.getInitialCiv();

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        const nextCellGen = this.getNextCellGen(
          [r as Coordinate, c as Coordinate, m, n],
          prevGen
        );
        if (nextCellGen.state !== prevGen[r][c].state && !changed)
          changed = true;
        nextGen[r][c] = nextCellGen;
      }
    }

    return [changed, nextGen];
  }

  private getNextCellGen(
    [r, c, m, n]: Coordinate[],
    prevGen: Civilization
  ): Cell {
    const liveNeighborStates = this.getLiveNeighborStates(
      [r, c, m, n],
      prevGen
    );

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
    [r, c, m, n]: Coordinate[],
    prevGen: Civilization
  ): CellState[] {
    let liveNeighborStates: CellState[] = [];
    const isIB = (r: Coordinate, c: Coordinate) =>
      r >= 0 && c >= 0 && r < m && c < n;

    this._directions.forEach(([dr, dc]) => {
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
