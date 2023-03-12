type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type Resolution = Range<3, 8>;

export type Coordinate = Range<0, 100>;

export type Coordinates = [Coordinate, Coordinate];

export type CellState =  Range<0, 3>;

export interface Cell {
  state: CellState;
  coors: Coordinates;
};

export type Civilization = Cell[][];
