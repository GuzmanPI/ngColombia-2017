import {Component, EventEmitter, Output} from '@angular/core';
import {City, Country, State} from '../data-models/geo-entities.model';

@Component({
  selector: 'app-geo-entities',
  templateUrl: './geo-entities.component.html',
  styleUrls: ['./geo-entities.component.css']
})
export class GeoEntitiesComponent {

  selectedCountry: Country;
  selectedState: State;
  selectedCity: City;

  @Output() onSelectCountry = new EventEmitter<Country>();
  @Output() onSelectState = new EventEmitter<State>();
  @Output() onSelectCity = new EventEmitter<City>();

  selectCountry(): void {
    this.onSelectCountry.emit(this.selectedCountry);
  }

  selectState(): void {
    this.onSelectState.emit(this.selectedState);
  }

  selectCity(): void {
    this.onSelectCity.emit(this.selectedCity);
  }

}
