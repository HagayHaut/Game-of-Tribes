import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { CivilizationService } from './services/civilization.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, CellComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.height = 40;
    app.width = 60;
    app._civService = new CivilizationService(app.width, app.height);
    app.civ = app._civService.getInitialCiv();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set the `width` and `height` properties based on the window size', async () => {
      fixture.whenStable().then(() => {
        const [wWidth, wHeight] = [window.innerWidth, window.innerHeight - 100];
        const [width, height] = [~~(wWidth / 17), ~~(wHeight / 16)];

        app.ngOnInit();

        expect(app.width).toBe(width);
        expect(app.height).toBe(height);
        expect(app._civService.width).toBe(width);
        expect(app._civService.height).toBe(height);
      })
    });
  });

  describe('onAllGenClick()', () => {
    it('if the `running` property is `true`, should set it to `false`', () => {
      // Arrange
      app.running = true;

      // Act
      app.onAllGenClick();

      // Assert
      expect(app.running).toBeFalse();
    });

    describe('`running` property is `false`', () => {

      beforeEach(() => {
        app.running = false;
      })

      it('should set `running` property to `true`', () => {
        // Act
        app.onAllGenClick();

        // Assert
        expect(app.running).toBeTrue();
      });

      it('should store the interval ID in the `startInterval` property', () => {
        // Arrange
        app.startInterval = 0;

        // Act
        app.onAllGenClick();

        expect(app.startInterval).not.toEqual(0);
      });

      
    });
  });

  describe('onChildCellClick()', () => {
    beforeEach(() => {
      app.yellowsTurn = true;
    });

    it('should toggle `yellowsTurn` boolean property', () => {
      // Act
      app.onChildCellClick({ coors: [0, 0] });

      // Assert
      expect(app.yellowsTurn).toBeFalse();

      // Act
      app.onChildCellClick({ coors: [0, 0] });

      // Assert
      expect(app.yellowsTurn).toBeTrue();
    });

    it('should update the coordinates in the `civ` cell according to `yellowsTurn` property', () => {
      // Act
      app.onChildCellClick({ coors: [0, 0] });

      // Assert
      expect(app.civ[0][0]).toBe(1);

      // Act
      app.onChildCellClick({ coors: [0, 0] });

      // Assert
      expect(app.civ[0][0]).toBe(2);
    });
  });

  describe('onMakeGlidersClick()', () => {
    let makeGlidersBtn: HTMLButtonElement;

    beforeEach(() => {
      makeGlidersBtn = fixture.nativeElement.querySelector('#makeGliders');
    });

    it('should be invoked when the `click` event is dispatched from he make gliders button', () => {
      // Arrange
      spyOn(app, 'onMakeGlidersClick');

      // Act
      makeGlidersBtn.click();

      // Assert
      expect(app.onMakeGlidersClick).toHaveBeenCalled();
    });

    it('should update the `civ` in the property', () => {
      // Arrange
      app.civ = app._civService.getInitialCiv();
      const initialCiv = app._civService.getInitialCiv();

      // Act
      makeGlidersBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialCiv);
    });
  });

  describe('onNextGenClick()', () => {
    let nextGenBtn: HTMLButtonElement;

    beforeEach(() => {
      nextGenBtn = fixture.nativeElement.querySelector('#nextGen');
    });

    it('should be invoked when `click` event is dispatched from the next gen button', () => {
      // Arrange
      spyOn(app, 'onNextGenClick');

      // Act
      nextGenBtn.click();

      // Assert
      expect(app.onNextGenClick).toHaveBeenCalled();
    });

    it('should update the `civ` property if the civilization has changed', () => {
      // Arrange
      app.civ = app._civService.getPowerColonyCiv();
      const initialState = app._civService.getInitialCiv();

      // Act
      nextGenBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialState);
    });
  });

  describe('onMakeBoatsClick()', () => {
    let makeBoatsBtn: HTMLButtonElement;

    beforeEach(() => {
      makeBoatsBtn = fixture.nativeElement.querySelector('#makeBoats');
    });

    it('should be invoked when the `click` event is dispatched from he make boats button', () => {
      // Arrange
      spyOn(app, 'onMakeBoatsClick');

      // Act
      makeBoatsBtn.click();

      // Assert
      expect(app.onMakeBoatsClick).toHaveBeenCalled();
    });

    it('should update the `civ` in the property', () => {
      // Arrange
      app.civ = app._civService.getInitialCiv();
      const initialCiv = app._civService.getInitialCiv();

      // Act
      makeBoatsBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialCiv);
    });
  });

  describe('onMakePowerColonyCiv()', () => {
    let makePowerColonyBtn: HTMLButtonElement;

    beforeEach(() => {
      makePowerColonyBtn =
        fixture.nativeElement.querySelector('#makePowerColony');
    });

    it('should be invoked when the `click` event is dispatched from he make gliders button', () => { 
      // Arrange
      spyOn(app, 'onMakePowerColonyCiv');

      // Act
      makePowerColonyBtn.click();

      // Assert
      expect(app.onMakePowerColonyCiv).toHaveBeenCalled();
    });

    it('should update the `civ` in the property', () => {
      // Arrange
      app.civ = app._civService.getInitialCiv();
      const initialCiv = app._civService.getInitialCiv();

      // Act
      makePowerColonyBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialCiv);
    });
  });

  describe('onRandomCivClick()', () => {
    let randomCivBtn: HTMLButtonElement;

    beforeEach(() => {
      randomCivBtn = fixture.nativeElement.querySelector('#randomCiv');
    });

    it('should be invoked when the `click` event is dispatched from he make gliders button', () => {
      // Arrange
      spyOn(app, 'onRandomCivClick');

      // Act
      randomCivBtn.click();

      // Assert
      expect(app.onRandomCivClick).toHaveBeenCalled();
    });

    it('should update the `civ` in the property', () => {
      // Arrange
      app.civ = app._civService.getInitialCiv();
      const initialCiv = app._civService.getInitialCiv();

      // Act
      randomCivBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialCiv);
    });
  });

  describe('onNaturalDisaster()', () => {
    let naturalDisasterBtn: HTMLButtonElement;

    beforeEach(() => {
      naturalDisasterBtn =
        fixture.nativeElement.querySelector('#naturalDisaster');
    });

    it('should be invoked when the natural disaster button is clicked', () => {
      // Arrange
      spyOn(app, 'onNaturalDisaster');

      // Act
      naturalDisasterBtn.click();

      // Assert
      expect(app.onNaturalDisaster).toHaveBeenCalled();
    });

    it('should update the `civ` in the property to all dead cells (0)', () => {
      // Arrange
      app.civ = app._civService.getRandomCiv(); // populate with live cells

      // Act
      app.onNaturalDisaster();

      // Assert
      expect(app.civ).toEqual(app._civService.getInitialCiv());
    });

    it('if the `running` property is `true`, should set it to `false`', () => {
      // Arrange
      app.running = true;

      // Act
      app.onNaturalDisaster();

      // Assert
      expect(app.running).toBeFalse();
    });
  });
});
