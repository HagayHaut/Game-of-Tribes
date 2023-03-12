import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell, Coordinates, Resolution } from '../models/app.states';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() cellData: Cell = { coors: [0, 0], state: 0 };
  @Input() resolution: Resolution = 4;
  @Output() cellClicked = new EventEmitter<{ coors: Coordinates }>();

  onCellClick() {
    this.cellClicked.emit({ coors: this.cellData.coors });
  }
}
