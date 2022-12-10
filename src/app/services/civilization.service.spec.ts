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

    it('should place the boats in the corners, regardless of screen size', () => {
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

    it('should place the gliders in the corners, regardless of screen size', () => {
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
});
