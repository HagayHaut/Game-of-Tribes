import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let cellComponent: CellComponent;

  let fixture: ComponentFixture<CellComponent>;
  let cell: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
    }).compileComponents();

    const getRandomIndex = (maxValue: number): number => {
      return ~~(Math.random() * maxValue);
    };

    fixture = TestBed.createComponent(CellComponent);
    cellComponent = fixture.componentInstance;
    cell = fixture.debugElement.nativeElement.querySelector('div');
    // cellComponent.coordinates = [getRandomIndex(height), getRandomIndex(width)];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cellComponent).toBeTruthy();
  });

  describe('onCellClick():', () => {
    it('should be invoked when the cell is clicked', () => {
      // Arrange
      spyOn(cellComponent, 'onCellClick');

      // Act
      cell.click();

      // Assert
      expect(cellComponent.onCellClick).toHaveBeenCalled();
    });

    it('should emit its coordinates when clicked', () => {
      // Arrange
      spyOn(cellComponent.cellClicked, 'emit');
      // Act

      cell.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      // Assert
      expect(cellComponent.cellClicked.emit).toHaveBeenCalled();
    });
  });
});
