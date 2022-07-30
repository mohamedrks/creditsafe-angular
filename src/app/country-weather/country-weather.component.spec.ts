import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWeatherComponent } from './country-weather.component';

describe('CountryWeatherComponent', () => {
  let component: CountryWeatherComponent;
  let fixture: ComponentFixture<CountryWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
