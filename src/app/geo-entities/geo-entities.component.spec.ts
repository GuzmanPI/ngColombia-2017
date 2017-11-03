import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GeoEntitiesComponent } from './geo-entities.component';
import { GeoDataService } from './directive/service/geo-data.service';
import { GeoDataDirective } from './directive/geo-data.directive';

describe('GeoEntitiesComponent', () => {
  let component: GeoEntitiesComponent;
  let fixture: ComponentFixture<GeoEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeoEntitiesComponent, GeoDataDirective],
      imports: [FormsModule, HttpClientModule],
      providers: [GeoDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
