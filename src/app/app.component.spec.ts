import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GoL-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GoL-angular');
  });

  it('should be initialized with a dead civilization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const civ = fixture.componentInstance.civ;
    let flag: boolean = false;
    civ.forEach((row) => {
      row.forEach((cell) => {
        if (cell) flag = true;
      });
    });
    expect(flag).toEqual(false);
  });

  it('should have the proportions specified by its width and height properties', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const { civ, width, height } = fixture.componentInstance;
    expect(civ[0].length).toEqual(width);
    expect(civ.length).toEqual(height);
  });

  describe('onNaturalDisaster', () => {
    const fixture = TestBed.createComponent(AppComponent);

    it('should toggle "running" state to false', () => {
      fixture.componentInstance.onAllGenClick();
      fixture.componentInstance.onNaturalDisaster();
      expect(fixture.componentInstance.running).toEqual(false);
    });
  });
});
