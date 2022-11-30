import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'GoL-angular';
  width = 0;
  height = 0;
  resolution = 4;
  civ = [[1, 1]];
  running = false;
  startInterval: any;
  yellowsTurn = true;

  ngOnInit(): void {
    let [wWidth, wHeight] = [window.innerWidth, window.innerHeight - 100];
    this.width = ~~(wWidth / 17);
    this.height = ~~(wHeight / 16);
    this.civ = getInitialCiv(this.width, this.height);
  }

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

  onMakeBoatsClick(): void {
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
