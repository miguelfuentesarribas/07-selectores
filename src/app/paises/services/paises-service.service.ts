import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _continent: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get continent () {
    return [...this._continent];
  }

  constructor() { }
}
