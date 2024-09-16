import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should have a router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    expect(divElement).not.toBeNull();
    divElement?.classList.forEach((cssClass) => {
        expect(cssClasses).toContain(cssClass);
    });
  });
});
