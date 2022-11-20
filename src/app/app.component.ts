import { Component } from '@angular/core';
import { getNextGen } from '../helpers/getNextGen';
import { getInitialCiv } from '../helpers/getInitialCiv';
import { getRandomCiv } from '../helpers/getRandomCiv';
import { getGliderCiv } from '../helpers/getGliderCiv';
import { getPowerColonyCiv } from '../helpers/getPowerColonyCiv';
import { getBoatCiv } from '../helpers/getBoatCiv';

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
  yellowsTurn = true;

  onChildCellClick(eventData: { coors: number[] }): void {
    const [r, c] = eventData.coors;
    this.civ[r][c] = this.yellowsTurn ? 1 : 2;
    this.yellowsTurn = !this.yellowsTurn;
  }

  onNextGenClick(): void {
    this.civ = getNextGen(this.civ)[1];
  }

  onAllGenClick(): void {
    if (!this.running) {
      this.running = true;
      this.startInterval = setInterval(() => {
        const [changed, nextGen] = getNextGen(this.civ);
        if (!changed) {
          this.stopInterval();
        } else {
          this.civ = nextGen;
        }
      }, 200);
    } else {
      this.stopInterval();
    }
  }

  onMakeBoatsClick() {
    this.civ = getBoatCiv(this.width, this.height);
  }

  onMakeGlidersClick(): void {
    this.civ = getGliderCiv(this.width, this.height);
  }

  onMakePowerColonyCiv(): void {
    this.civ = getPowerColonyCiv(this.width, this.height);
  }

  stopInterval(): void {
    this.running = false;
    clearInterval(this.startInterval);
  }

  onRandomCivClick(): void {
    this.civ = getRandomCiv(this.width, this.height);
  }

  onNaturalDisaster(): void {
    if (this.running) this.stopInterval();
    this.civ = getInitialCiv(this.width, this.height);
  }
}
