import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

xdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GoL-angular'`, () => {
    expect(app.title).toEqual('GoL-angular');
  });

  it('should be initialized with a dead civilization', () => {
    const { civ } = app;
    let flag: boolean = false;
    civ.forEach((row) => {
      row.forEach((cell) => {
        if (cell) flag = true;
      });
    });
    expect(flag).toEqual(false);
  });

  it('should have the proportions specified by its width and height properties', () => {
    const { civ, width, height } = app;
    expect(civ[0].length).toEqual(width);
    expect(civ.length).toEqual(height);
  });

  xdescribe('onNaturalDisaster', () => {
    it('should toggle "running" state to false', () => {
      fixture.componentInstance.onAllGenClick();
      fixture.componentInstance.onNaturalDisaster();
      expect(fixture.componentInstance.running).toEqual(false);
    });
  });

  describe('onMakeBoatsClick(): ', () => {
    it('should be invoked when the user clicks the `Make Boats` button', () => {
      console.log(fixture.debugElement.query(By.css('button')));
      const button =
        fixture.debugElement.nativeElement.querySelectorAll('button')[4];
    });

    it('should invoke `getBoatCiv()`', () => {});
  });
});
