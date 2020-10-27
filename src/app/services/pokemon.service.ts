import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model.';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  
  private endpointUrl : string = 'http://localhost:8080';

  private createCallerSource = new Subject();
  public createCaller$ = this.createCallerSource.asObservable();

  constructor(private http: HttpClient){
  }


  emitCreateEvent(): void {
    this.createCallerSource.next();
  }

  /** POST Crear un pokemon */
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    let createUrl = this.endpointUrl + '/pokemons';
    return this.http.post<Pokemon>(createUrl, pokemon, {responseType: 'json'});
  }

  /** DELETE suprimir un pokemon */
  deletePokemon(id: String): Observable<String> {
    let deleteUrl = this.endpointUrl + '/' + id;
    return this.http.delete<String>(deleteUrl, {responseType: 'json'});
  }

  /** GET todos los pokemons */
  findAllPokemon(): Observable<Pokemon[]> {
    let findAllUrl = this.endpointUrl + '/pokemons';
    return this.http.get<Pokemon[]>(findAllUrl, {responseType: 'json'});
  }

  /** GET un pokemon */
  findPokemonById(id: string): Observable<Pokemon> {
    let findUrl = this.endpointUrl + '/pokemons/' + id;
    return this.http.get<Pokemon>(findUrl, {responseType: 'json'});
  }
}