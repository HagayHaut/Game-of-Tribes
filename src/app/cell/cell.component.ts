import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() isAlive: boolean = false;
  @Input() coordinates: number[] = [];
  @Input() resolution: number = 0;
  @Output() cellClicked = new EventEmitter<{ coors: number[] }>();

  constructor() {}

  ngOnInit(): void {}

  onCellClick() {
    this.cellClicked.emit({ coors: this.coordinates });
  }
}
