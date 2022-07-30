import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from 'src/app/models/city';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

// API URL retrieved from here.
const WEATHER_API_URL = 'https://localhost:5001/';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<City[]> {
    let res = this.http.get<City[]>(
      WEATHER_API_URL + 'cityInformation',
      httpOptions
    );
    return res;
  }

  getCityInfo(id: number): Observable<City> {
    let res = this.http.get<City>(
      WEATHER_API_URL + 'cityInformation/GetCityInfo/' + id,
      httpOptions
    );
    return res;
  }

  getWeatherDetails(city: string): Observable<City[]> {
    let res = this.http.post<City[]>(
      WEATHER_API_URL + 'cityInformation?city=' + city,
      httpOptions
    );
    return res;
  }

  addCity(city: any): Observable<any> {
    // const body = JSON.stringify(city);
    return this.http.post(
      WEATHER_API_URL + 'cityInformation',
      city,
      httpOptions
    );
  }

  update(id: number, city: City): Observable<City> {
    return this.http.put<City>(
      WEATHER_API_URL + 'cityInformation/' + id,
      city,
      httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete<City>(
      WEATHER_API_URL + 'cityInformation/' + id,
      httpOptions
    );
  }
}
