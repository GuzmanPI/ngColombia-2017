import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GeoEntitiesComponent } from './geo-entities/geo-entities.component';
import { GeoDataService } from './geo-entities/directive/service/geo-data.service';
import { GeoDataDirective } from './geo-entities/directive/geo-data.directive';

describe('AppComponent', () => {
  let appComponent: ComponentFixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, GeoEntitiesComponent, GeoDataDirective],
      imports: [FormsModule, HttpClientModule],
      providers: [GeoDataService]
    }).compileComponents();

    appComponent = TestBed.createComponent(AppComponent);
  }));
  it('should create the app', async(() => {
    const app = appComponent.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should have the ng-colombia logo', async(() => {
    const compiled = appComponent.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeTruthy();
  }));
  it('should have the app-geo-entities component', async(() => {
    const compiled = appComponent.debugElement.nativeElement;
    expect(compiled.querySelector('app-geo-entities')).toBeTruthy();
  }));
});
