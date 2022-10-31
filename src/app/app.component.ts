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
  width = 75;
  height = 34;
  resolution = 4;
  civ = getInitialCiv(this.width, this.height);
  running = false;
  startInterval: any;

  onChildCellClick(eventData: { coors: number[] }) {
    const [r, c] = eventData.coors;
    this.civ[r][c] = !this.civ[r][c];
  }

  onNextGenClick() {
    this.civ = getNextGen(this.civ);
  }

  onAllGenClick() {
    if (!this.running) {
      this.startInterval = setInterval(() => {
        this.civ = getNextGen(this.civ);
      }, 300);
    } else {
      this.stopInterval();
    }
    this.running = !this.running;
  }

  stopInterval() {
    clearInterval(this.startInterval);
  }

  onRandomCivClick() {
    this.civ = getRandomCiv(this.width, this.height);
  }

  onNaturalDisaster() {
    this.civ = getInitialCiv(this.width, this.height);
  }
}
