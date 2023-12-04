import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 *  Generated using 'ng generate service signin'
 */

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private apiUrl = '';  //Url to the API //TODO: Ask for the URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
  ) { }

  //TODO
  /** GET users from the server */
  connecterUtilisateur() {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
}
