import { Component } from '@angular/core';
import { getNextGen } from '../helpers/getNextGen';
import { getInitialCiv } from '../helpers/getInitialCiv';
import { getRandomCiv } from '../helpers/getRandomCiv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GoL-angular';
  width = 50;
  height = 28;
  civ = getInitialCiv(this.width, this.height);

  onWidthInput(value: string) {
    this.width = Number(value);
    this.civ = getInitialCiv(this.width, this.height);
  }

  onHeightInput(value: string) {
    this.height = Number(value);
    this.civ = getInitialCiv(this.width, this.height);
  }

  onChildCellClick(eventData: { coors: number[] }) {
    const [r, c] = eventData.coors;
    this.civ[r][c] = !this.civ[r][c];
  }

  onNextGenClick() {
    this.civ = getNextGen(this.civ);
  }

  onRandomCivClick() {
    this.civ = getRandomCiv(this.width, this.height);
  }

  onNaturalDisaster() {
    this.civ = getInitialCiv(this.width, this.height);
  }
}
