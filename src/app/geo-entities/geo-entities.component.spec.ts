import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoEntitiesComponent } from './geo-entities.component';

describe('GeoEntitiesComponent', () => {
  let component: GeoEntitiesComponent;
  let fixture: ComponentFixture<GeoEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoEntitiesComponent ]
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
