import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CivilizationService } from './civilization.service';

describe('CivilizationService', () => {
  let width: number;
  let height: number;
  let civService: CivilizationService;
  beforeEach(async () => {
    width = 50;
    height = 40;
    civService = new CivilizationService(width, height);
  });

  it('should instantiate the service with given width and height', () => {
    expect(civService.width).toEqual(width);
    expect(civService.height).toEqual(height);
  });

  describe('getInitialCiv(): ', () => {
    let initialCiv: number[][];

    beforeEach(() => {
      initialCiv = civService.getInitialCiv();
    });

    it('should initialize a dead civilization', () => {
      let hasLiveCell: boolean = false;
      initialCiv.forEach((row) => {
        row.forEach((cell) => {
          if (cell) hasLiveCell = true;
        });
      });
      expect(hasLiveCell).toEqual(false);
    });

    it('should return a 2-D array with initial width and height', () => {
      expect(initialCiv[0].length).toEqual(width);
      expect(initialCiv.length).toEqual(height);
    });
  });

  describe('getRandomCiv(): ', () => {
    let randomCiv: number[][];

    beforeEach(() => {
      randomCiv = civService.getRandomCiv();
    });

    it('should only contain 3 states (dead: 0, yellow: 1, blue: 2)', () => {
      let cellStates: Set<number> = new Set();
      randomCiv.forEach((row) => {
        row.forEach((cell) => cellStates.add(cell));
      });
      expect(cellStates.size).toEqual(3);
      expect(cellStates.has(0)).toBeTruthy();
      expect(cellStates.has(1)).toBeTruthy();
      expect(cellStates.has(2)).toBeTruthy();
    });

    it('should return a 2-D array with initial width and height', () => {
      expect(randomCiv[0].length).toEqual(width);
      expect(randomCiv.length).toEqual(height);
    });

    it('should give each cell an equal chance of being any of the 3 cellStates', () => {
      const cellStates: Set<number> = new Set([0, 1, 2]);
      const randomCol = Math.floor(Math.random() * width);
      const randomRow = Math.floor(Math.random() * height);
      let iterationCount = 0;

      while (cellStates.size) {
        iterationCount++;
        const newRandomCiv = civService.getRandomCiv();
        const cellValue = newRandomCiv[randomRow][randomCol];
        cellStates.delete(cellValue);
      }
      expect(iterationCount).toBeLessThan(100);
    });
  });

  describe('getBoatCiv(): ', () => {
    let boatCiv: number[][];

    beforeEach(() => {
      boatCiv = civService.getBoatCiv();
    });

    it('should return a 2-D array with initial width and height', () => {
      expect(boatCiv[0].length).toEqual(width);
      expect(boatCiv.length).toEqual(height);
    });

    it('should contain 36 live cells (9 per boat)', () => {
      let liveCellCount = 0;
      boatCiv.forEach((row) => {
        row.forEach((cell) => cell && liveCellCount++);
      });
      expect(liveCellCount).toEqual(36);
    });

    it('should place the boats in the corners, regardless of board size', () => {
      const randomFromRange = (min: number, max: number): number => {
        return ~~(Math.random() * (max - min) + min);
      };
      const randomWidth = randomFromRange(50, 100);
      const randomHeight = randomFromRange(40, 80);
      const randomSizeCivService = new CivilizationService(
        randomWidth,
        randomHeight
      );
      const randomBoatCiv = randomSizeCivService.getBoatCiv();

      // boat anchors
      const [h1, w1] = [5, 5];
      const [h2, w2] = [randomHeight - 6, 5];
      const [h3, w3] = [5, randomWidth - 6];
      const [h4, w4] = [randomHeight - 6, randomWidth - 6];

      // top left
      expect(randomBoatCiv[h1][w1]).toEqual(1);
      // bottom left
      expect(randomBoatCiv[h2][w2]).toEqual(2);
      // top right
      expect(randomBoatCiv[h3][w3]).toEqual(2);
      // bottom right
      expect(randomBoatCiv[h4][w4]).toEqual(1);
    });
  });

  describe('getGliderCiv(): ', () => {
    let gliderCiv: number[][];

    beforeEach(() => {
      gliderCiv = civService.getGliderCiv();
    });

    it('should return a 2-D array with initial width and height', () => {
      expect(gliderCiv[0].length).toEqual(width);
      expect(gliderCiv.length).toEqual(height);
    });

    it('should contain 20 live cells (4 per glider)', () => {
      let liveCellCount = 0;
      gliderCiv.forEach((row) => {
        row.forEach((cell) => cell && liveCellCount++);
      });
      expect(liveCellCount).toEqual(20);
    });

    it('should place the gliders in the corners, regardless of board size', () => {
      const randomFromRange = (min: number, max: number): number => {
        return ~~(Math.random() * (max - min) + min);
      };
      const randomWidth = randomFromRange(50, 100);
      const randomHeight = randomFromRange(40, 80);
      const randomSizeCivService = new CivilizationService(
        randomWidth,
        randomHeight
      );
      const randomGliderCiv = randomSizeCivService.getGliderCiv();

      // top left
      expect(randomGliderCiv[0][1]).toEqual(1);
      // bottom left
      expect(randomGliderCiv[randomHeight - 2][0]).toEqual(2);
      // top right
      expect(randomGliderCiv[0][randomWidth - 3]).toEqual(2);
      // bottom right
      expect(randomGliderCiv[randomHeight - 3][randomWidth - 3]).toEqual(1);
    });
  });

  describe('getPowerColonyCiv(): ', () => {
    let powerColonyCiv: number[][];

    beforeEach(() => {
      powerColonyCiv = civService.getPowerColonyCiv();
    });

    it('should return a 2-D array with initial width and height', () => {
      expect(powerColonyCiv[0].length).toEqual(width);
      expect(powerColonyCiv.length).toEqual(height);
    });

    it('should contain 7 live cells', () => {
      let liveCellCount = 0;
      powerColonyCiv.forEach((row) => {
        row.forEach((cell) => cell && liveCellCount++);
      });
      expect(liveCellCount).toEqual(7);
    });

    it('should place the power colony in the center, regardless of board size', () => {
      const randomFromRange = (min: number, max: number): number => {
        return ~~(Math.random() * (max - min) + min);
      };
      const randomWidth = randomFromRange(50, 100);
      const randomHeight = randomFromRange(40, 80);
      const randomSizeCivService = new CivilizationService(
        randomWidth,
        randomHeight
      );
      const randomSizePowerColonyCiv = randomSizeCivService.getPowerColonyCiv();

      const midWidth = ~~(randomWidth / 2);
      const midHeight = ~~(randomHeight / 2);

      expect(randomSizePowerColonyCiv[midHeight][midWidth]).toEqual(1);
      expect(randomSizePowerColonyCiv[midHeight - 1][midWidth - 2]).toEqual(2);
      expect(randomSizePowerColonyCiv[midHeight - 1][midWidth - 1]).toEqual(0);
    });
  });

  describe('getNextGen(): [boolean, number[][]]', () => {
    let firstGeneration: number[][];

    beforeEach(() => {
      firstGeneration = civService.getRandomCiv();
    });

    describe('first index of return value (boolean)', () => {
      it('should be `true` when next gen is different from the input civ', () => {
        const [changed, _] = civService.getNextGen(civService.getBoatCiv());
        expect(changed).toEqual(true);
      });

      it('should be `false` when next gen is identical to the input civ', () => {
        const [changed, _] = civService.getNextGen(civService.getInitialCiv());
        expect(changed).toEqual(false);
      });
    });

    describe('second index of return value (number[][])', () => {
      it('should be a new gen of the same proportion as the input civ', () => {
        const [_, secondGeneration] = civService.getNextGen(firstGeneration);
        expect(secondGeneration[0].length).toEqual(width);
        expect(secondGeneration.length).toEqual(height);
      });
    });

    describe('A dead cell: ', () => {
      let initialCiv: number[][];

      beforeEach(() => {
        initialCiv = Array(4)
          .fill([])
          .map((_) => Array(4).fill(0));

        initialCiv[0][1] = 1;
        initialCiv[1][0] = 1;
        initialCiv[1][1] = 2;

        const [_, nextGenCiv] = civService.getNextGen(initialCiv);
        expect(nextGenCiv[0][0]).toEqual(1);
      });

      it('should come to life if it has exactly 3 live neighbors', () => {
        const [_, nextGenCiv] = civService.getNextGen(initialCiv);

        expect(nextGenCiv[0][0]).toBeTruthy();
      });

      it('should come to life with the tribe of the majority neighbor', () => {
        const [_, nextGenCiv] = civService.getNextGen(initialCiv);

        expect(nextGenCiv[0][0]).toEqual(1);
      });

      it('should remain dead if it has less than 3 live neighbors', () => {
        const [_, nextGenCiv] = civService.getNextGen(initialCiv);

        // 0 live neighbors
        expect(nextGenCiv[3][3]).toEqual(0);
        // 1 live neighbor
        expect(nextGenCiv[0][2]).toEqual(0);
      });

      it('should remain dead if it has more than 3 live neighbors', () => {
        const fullCiv: number[][] = Array(4)
          .fill([])
          .map((_) => Array(4).fill(1));

        fullCiv[1][1] = 0;

        const [_, nextGenCiv] = civService.getNextGen(fullCiv);

        expect(nextGenCiv[1][1]).toEqual(0);
      });
    });

    describe('A live cell: ', () => {
      let deadCiv: number[][];

      beforeEach(() => {
        deadCiv = Array(4)
          .fill([])
          .map((_) => Array(4).fill(0));
      });

      it('should die if has less than two live neighbors', () => {
        deadCiv[0][1] = 1;
        deadCiv[1][1] = 1;
        deadCiv[3][3] = 1;
        const [_, nextGenCiv] = civService.getNextGen(deadCiv);
        // 1 live neighbor
        expect(nextGenCiv[0][1]).toEqual(0);
        // 0 live neighbors
        expect(nextGenCiv[3][3]).toEqual(0);
      });

      it('should die if it has more than three live neighbors', () => {
        const liveCiv: number[][] = deadCiv.map((row) => row.map((_) => 1));

        const [_, nextGenCiv] = civService.getNextGen(liveCiv);

        expect(nextGenCiv[0][1]).toEqual(0);
        expect(nextGenCiv[1][1]).toEqual(0);
      });

      it('should remain the same tribe if out of two live neighbors one is the same tribe as itself', () => {
        deadCiv[0][0] = 1;
        deadCiv[0][1] = 1;
        deadCiv[0][2] = 2;

        const [_, nextGenCiv] = civService.getNextGen(deadCiv);
        expect(nextGenCiv[1][1]).toEqual(1);
      });

      it('should remain the same tribe if it has two live neighbors of the same tribe as itself', () => {
        deadCiv[0][0] = 1;
        deadCiv[0][1] = 1;
        deadCiv[0][2] = 1;

        const [_, nextGenCiv] = civService.getNextGen(deadCiv);
        expect(nextGenCiv[1][1]).toEqual(1);
      });

      it('should switch tribes if it has two live neighbors of a different tribe', () => {
        deadCiv[0][0] = 1;
        deadCiv[0][1] = 2;
        deadCiv[0][2] = 1;

        const [_, nextGenCiv] = civService.getNextGen(deadCiv);
        expect(nextGenCiv[1][1]).toEqual(1);
      });

      it('should become the tribe of the majority of its neighbors if it has three neighbors', () => {
        deadCiv[0][1] = 2;
        deadCiv[1][1] = 1;
        deadCiv[2][1] = 2;
        deadCiv[1][0] = 1;
        deadCiv[1][2] = 2;

        const [_, nextGenCiv] = civService.getNextGen(deadCiv);

        expect(nextGenCiv[1][0]).toEqual(2);
        expect(nextGenCiv[0][1]).toEqual(1);
        expect(nextGenCiv[1][2]).toEqual(2);
      });
    });
  });
});
