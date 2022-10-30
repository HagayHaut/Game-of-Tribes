import { Component } from '@angular/core';

const WIDTH = 40;
const HEIGHT = 30;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GoL-angular';
  civ = Array(HEIGHT)
    .fill([])
    .map(() => Array(WIDTH).fill(false));

  onChildCellClick(eventData: { coors: number[] }) {
    const [r, c] = eventData.coors;
    this.civ[r][c] = !this.civ[r][c];
  }
}
