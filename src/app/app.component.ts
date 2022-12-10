import { Component, OnInit } from '@angular/core';
import { CivilizationService } from 'src/services/civilization.service';

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

  _civService: CivilizationService;

  constructor() {
    this._civService = new CivilizationService(40, 30);
  }

  ngOnInit(): void {
    const [wWidth, wHeight] = [window.innerWidth, window.innerHeight - 100];
    this.width = ~~(wWidth / 17);
    this.height = ~~(wHeight / 16);
    this._civService.width = this.width;
    this._civService.height = this.height;
    this.civ = this._civService.getInitialCiv();
  }

  onChildCellClick(eventData: { coors: number[] }): void {
    const [r, c] = eventData.coors;
    this.civ[r][c] = this.yellowsTurn ? 1 : 2;
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
