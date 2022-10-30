import { Component } from '@angular/core';
import { getNextGen } from '../helpers/getNextGen';
import { getInitialCiv } from '../helpers/getInitialCiv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GoL-angular';
  width = 40;
  height = 30;
  civ = getInitialCiv(this.width, this.height);

  onChildCellClick(eventData: { coors: number[] }) {
    const [r, c] = eventData.coors;
    this.civ[r][c] = !this.civ[r][c];
  }

  onNextGenClick() {
    this.civ = getNextGen(this.civ);
  }

  onNaturalDisaster() {
    this.civ = getInitialCiv(this.width, this.height);
  }
}
