import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() cellState: number = 0;
  @Input() coordinates: number[] = [];
  @Input() resolution: number = 0;
  @Output() cellClicked = new EventEmitter<{ coors: number[] }>();

  onCellClick() {
    this.cellClicked.emit({ coors: this.coordinates });
  }
}
