import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

import {GeoDataService} from './geo-data.service';
import {environment} from '../../../../environments/environment';

import {Country, State, City} from '../../../data-models/geo-entities.model';

describe('GeoDataService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        HttpHandler,
        GeoDataService,
        {provide: environment.restApi, useValue: environment.restApi},
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be created', inject([GeoDataService], (service: GeoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('GET: All Countries', () => {
    it('should return a Promise<Country[]> for a successful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {

        const mockResponse = {
          data: [
            {name: 'Canada', code: 'ca'},
            {name: 'Colombia', code: 'co'},
            {name: 'Mexico', code: 'mx'}
          ]
        };

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        geoEntitiesService.getAllCountries()
          .then((countries: Country[]) => {
            expect(countries[0].name).toEqual('Canada');
            expect(countries[1].name).toEqual('Colombia');
            expect(countries[2].name).toEqual('Mexico');
          });
      }));

    it('should return an error for an unsuccessful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {
        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: {},
            status: 404
          })));
        });

        geoEntitiesService.getAllCountries()
          .then((response: Response) => {
            expect(response.status).toEqual(404);
          });
      }));
  });

  describe('GET: All States by ISO ALPHA-2 Country Code', () => {
    it('should return a Promise<State[]> for a successful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {

        const mockResponse = {
          data: [
            {region: 'Morelos', country: 'mx'},
            {region: 'Mexico', country: 'mx'}
          ]
        };

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        geoEntitiesService.getAllStatesByCountryCode('mx')
          .then((countries: State[]) => {
            expect(countries[0].region).toEqual('Morelos');
            expect(countries[1].region).toEqual('Mexico');
          });
      }));

    it('should return an error for an unsuccessful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {
        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: {},
            status: 404
          })));
        });

        geoEntitiesService.getAllStatesByCountryCode('mx')
          .then((response: Response) => {
            expect(response.status).toEqual(404);
          });
      }));
  });

  describe('GET: All Cities by State Name', () => {
    it('should return a Promise<City[]> for a successful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {

        const mockResponse = [
          {city: 'Medellín', region: 'Antioquia', country: 'co', latitude: '6.29138890', longitude: '-75.53611110'}
        ];

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        geoEntitiesService.getAllCitiesByStateName('Antioquia')
          .then((countries: City[]) => {
            expect(countries[0].city).toEqual('Medellín');
          });
      }));

    it('should return an error for an unsuccessful request',
      inject([GeoDataService, XHRBackend], (geoEntitiesService, mockBackend) => {
        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: {},
            status: 404
          })));
        });

        geoEntitiesService.getAllCitiesByStateName('Antioquia')
          .then((response: Response) => {
            expect(response.status).toEqual(404);
          });
      }));
  });
});
