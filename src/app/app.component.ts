import { Component, OnInit } from '@angular/core';
import { CivilizationService } from 'src/app/services/civilization.service';
import { Civilization, Coordinate, Coordinates, Resolution } from './models/app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GoL-angular';
  width: Coordinate = 0;
  height: Coordinate = 0;
  resolution: Resolution = 4;
  civ: Civilization = [[{ coors: [0, 0], state: 0 }]];
  running = false;
  startInterval: any;
  yellowsTurn = true;

  _civService: CivilizationService;

  constructor() {
    this._civService = new CivilizationService(40, 30);
  }

  ngOnInit(): void {
    const [wWidth, wHeight] = [window.innerWidth, window.innerHeight - 100];
    this.width = (~~(wWidth / 17)) as Coordinate;
    this.height = (~~(wHeight / 16)) as Coordinate;
    this._civService.width = this.width;
    this._civService.height = this.height;
    this.civ = this._civService.getInitialCiv();
  }

  onChildCellClick(eventData: { coors: Coordinates }): void {
    const [r, c] = eventData.coors;
    this.civ[r][c].state = this.yellowsTurn ? 1 : 2;
    this.yellowsTurn = !this.yellowsTurn;
  }

  onNextGenClick(): void {
    this.civ = this._civService.getNextGen(this.civ)[1];
  }

  onAllGenClick(): void {
    if (!this.running) {
      this.running = true;
      this.startInterval = setInterval(() => {
        const [changed, nextGen] = this._civService.getNextGen(this.civ);
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
    this.civ = this._civService.getBoatCiv();
  }

  onMakeGlidersClick(): void {
    this.civ = this._civService.getGliderCiv();
  }

  onMakePowerColonyCiv(): void {
    this.civ = this._civService.getPowerColonyCiv();
  }

  stopInterval(): void {
    this.running = false;
    clearInterval(this.startInterval);
  }

  onRandomCivClick(): void {
    this.civ = this._civService.getRandomCiv();
  }

  onNaturalDisaster(): void {
    if (this.running) this.stopInterval();
    this.civ = this._civService.getInitialCiv();
  }
}
