import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = 'https://restcountries.com/v3.1'
  private _region: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get region () {
    return [ ...this._region ];
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion( region: string ):Observable<PaisSmall[]> {

    return this.http.get<PaisSmall[]>(`${this._baseUrl}/region/${region}?fields=cca3,name`)

  }

  getPaisPorCodigo(codigo: string) :Observable<Pais[] | null> {

    if ( !codigo ) {
      return of(null)
    }

    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigoSmall(codigo: string) :Observable<PaisSmall> {
    const url = `${this._baseUrl}/alpha/${codigo}?fields=cca3,name`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos( borders: string[]): Observable<PaisSmall[]> {

    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = []; 

    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall( codigo );
      peticiones.push(peticion)
    });

    return combineLatest( peticiones );
  }
}
