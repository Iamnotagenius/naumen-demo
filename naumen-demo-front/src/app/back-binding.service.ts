import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgeModel } from './ageModel';
import { Observable, catchError, throwError } from 'rxjs';

let host = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class BackBindingService {
  constructor(private http: HttpClient) { }


  getAge(name: string): Observable<AgeModel> {
    return this.http.get<AgeModel>(`${host}/age`, {
        params: new HttpParams().set('name', name),
        observe: 'body',
        responseType: 'json'
    }).pipe(
      catchError(this.handleError)
    )
  }

  getOldest(): Observable<AgeModel> {
    return this.http.get<AgeModel>(`${host}/oldest`, {
      observe: 'body',
      responseType: 'json'
    })
  }

  getAll(): Observable<AgeModel[]> {
    return this.http.get<AgeModel[]>(`${host}/`, {
      observe: 'body',
      responseType: 'json'
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
