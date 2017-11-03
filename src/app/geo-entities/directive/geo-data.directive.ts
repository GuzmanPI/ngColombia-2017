import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

import {GeoDataService} from './service/geo-data.service';
import {Country, State, City} from '../../data-models/geo-entities.model';

/**
 * Exports an interface for the template's reference context
 * @propertyIt {any} $implicit An optional ISO ALPHA-2 Country, State or City Code.
 * */
export interface GeoDataContext {
  $implicit: any;
}

/**
 * The directive's geographical entity.
 * @propertyIt {string?} countryIsoCode An optional ISO ALPHA-2 Country Code.
 * @propertyIt {string?} stateName An optional State name.
 * @propertyIt {string} type  A geographical entity. Either "country", "state" or "city".
 * */
interface GeoEntity {
  countryIsoCode?: string;
  stateName?: string;
  type: string;
}
@Directive({
  selector: '[appGeoData]'
})
export class GeoDataDirective {
  /**
   * @param {ViewContainerRef} viewContainerRef The directive's view container reference
   * @param {TemplateRef<ViewContainerRef>} templateRef The directive's template reference
   * @param {GeoDataService} geoDataService The data service
   */
  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<GeoDataContext>,
              private geoDataService: GeoDataService) {
  }

  /**
   * Decides which geographical entities to load according to the hierarchy.
   * In other words, if the entity is a country loads its states, if it is a State it loads its cities.
   * @param {GeoEntity} geoEntity A geographical entity.
   */
  @Input()
  set appGeoData(geoEntity: GeoEntity) {
    if (geoEntity.type === 'country') {
      this.loadAllCountries();
    } else if (geoEntity.type === 'state') {
      this.loadAllStatesByCountryCode(geoEntity.countryIsoCode);
    } else {
      this.loadAllCitiesByStateName(geoEntity.countryIsoCode, geoEntity.stateName);
    }
  }

  /** Loads all countries. */
  private loadAllCountries(): void {
    this.geoDataService.getAllCountries()
      .then((countries: Country[]) => {
        this.createEmbeddedView(countries);
      });
  }

  /**
   * Loads all the states in a country by its ISO ALPHA-2 Code.
   * @param {string} countryIsoCode an ISO ALPHA-2 Country Code.
   */
  private loadAllStatesByCountryCode(countryIsoCode: string): void {
    this.geoDataService.getAllStatesByCountryCode(countryIsoCode)
      .then((states: State[]) => {
        this.createEmbeddedView(states);
      });
  }

  /**
   * Loads all the states in a country by its ISO ALPHA-2 Code.
   * @param {string} countryIsoCode an ISO ALPHA-2 Country Code.
   * @param {string} stateName the name of a state.
   */
  private loadAllCitiesByStateName(countryIsoCode: string, stateName: string): void {
    this.geoDataService.getAllCitiesByStateName(countryIsoCode, stateName)
      .then((cities: City[]) => {
        this.createEmbeddedView(cities);
      });
  }

  /**
   * Creates an embedded view with the data that comes from the API.
   * @param {<T>[]} geoEntities Generic geographical entity. It could be an object of type "Country", "State" or "City".
   */
  private createEmbeddedView<T>(geoEntities: T[]): void {
    geoEntities.forEach(entity => {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {$implicit: entity});
    });
  }
}
