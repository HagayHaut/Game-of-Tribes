import { Range } from "./app.util-types";

export type Resolution = Range<3, 8>;

export type Coordinate = Range<0, 100>;

export type Coordinates = [Coordinate, Coordinate];

export type CellState =  Range<0, 3>;

export interface Cell {
  state: CellState;
  coors: Coordinates;
};

export type Civilization = Cell[][];
