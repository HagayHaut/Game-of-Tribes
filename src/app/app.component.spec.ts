import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      declarations: [AppComponent],
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

  describe('onChildCellClick()', () => {
    
    it('should be invoked when a cell dispatches the `cellClicked` event', () => {
      let firstCell = fixture.debugElement.query(By.directive(CellComponent));
      console.log(firstCell);
    })
  })

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

    it('should update the `civ` state if the civilization has changed', () => {
      // Arrange
      app.civ = app._civService.getPowerColonyCiv();
      const initialState = app._civService.getInitialCiv();

      // Act
      nextGenBtn.click();

      // Assert
      expect(app.civ).not.toEqual(initialState);
    });
  });

  
});
