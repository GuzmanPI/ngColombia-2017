import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/map';

import {environment} from '../../../../environments/environment';
import {Country, State, City} from '../../../data-models/geo-entities.model';

@Injectable()
export class GeoDataService {
  /** URL parameters for the requests */
  urlParams: URLSearchParams;

  /**
   * Initializes the request options with its query params.
   * @param {HttpClient} httpClient Angular's http client
   */
  constructor(private  httpClient: HttpClient) {
    this.urlParams = new URLSearchParams();

    this.urlParams.set('key', environment.apiKey);
    this.urlParams.set('callback', environment.callback);
  }

  /**
   * GET all countries.
   * @returns {Promise<Country[]>} A promise with the countries from the API.
   */
  getAllCountries(): Promise<Country[]> {
    const queryParameters = new HttpParams().set('key', environment.apiKey);

    return this.httpClient.get<Country>(environment.restApi + 'country/all/', {params: queryParameters})
      .toPromise().then((response: any) => response as Country[]);
  }

  /**
   * GET all states by a country code.
   * @param {string} countryCode An ISO ALPHA-2 Country Code.
   * @returns {Promise<State[]>} A promise with the states from the API.
   */
  getAllStatesByCountryCode(countryCode: string): Promise<State[]> {
    const queryParameters = new HttpParams().set('key', environment.apiKey);

    return this.httpClient.get<State>(environment.restApi + 'region/' + countryCode + '/all/', {params: queryParameters})
      .toPromise().then((response: any) => response as State[]);
  }

  /**
   * GET all cities by a country code and state name.
   * @param {string} countryCode An ISO ALPHA-2 Country Code.
   * @param {string} stateName The name of a state.
   * @returns {Promise<City[]>} A promise with the states from the API.
   */
  getAllCitiesByStateName(countryCode: string, stateName: string): Promise<City[]> {
    const queryParameters: HttpParams = new HttpParams()
      .set('region', stateName)
      .set('key', environment.apiKey);

    return this.httpClient.get<City>(environment.restApi + 'city/' + countryCode + '/search/', {params: queryParameters})
      .toPromise()
      .then((response: any) => response as City[])
      .catch();
  }

}
