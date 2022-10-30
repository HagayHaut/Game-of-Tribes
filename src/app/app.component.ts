import { Component } from '@angular/core';
import { getNextGen } from '../helpers/getNextGen';

const WIDTH = 40;
const HEIGHT = 30;
const INITIAL_CIV: boolean[][] = Array(HEIGHT)
  .fill([])
  .map(() => Array(WIDTH).fill(false));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GoL-angular';
  civ = INITIAL_CIV;

  onChildCellClick(eventData: { coors: number[] }) {
    const [r, c] = eventData.coors;
    this.civ[r][c] = !this.civ[r][c];
  }

  onNextGenClick() {
    const nextGen: boolean[][] = getNextGen(this.civ);
    this.civ = nextGen;
  }
}
