import { Range } from "./app.util-types";

export type Resolution = Range<3, 8>;

export type Coordinate = Range<0, 100>;

export type CellState =  Range<0, 3>;

export type Coordinates = [Coordinate, Coordinate];

export interface Cell {
  state: CellState;
  coors: Coordinates;
};

export type Civilization = Cell[][];

export type Increment = -1 | 0 | 1;
