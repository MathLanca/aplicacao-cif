import { Injectable } from '@angular/core';
import { Evaluation } from '../interfaces/evaluation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient, private session:SessionService) { }

  newEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    const url = `${environment.evaluationBaseUrl}/v1/evaluation/new`;
    return this.http.post<Evaluation>(url,evaluation)
    .pipe(
      catchError(this.handleError)
    );
  }

  evaluationList(): Observable<Evaluation[]> {
    const url = `${environment.evaluationBaseUrl}/v1/evaluation/therapistevaluations/${this.session.userId}`;
    return this.http.get<Evaluation[]>(url);
  }

  getEvaluation(evaluation_id:string): Observable<Evaluation[]> {
    const url = `${environment.evaluationBaseUrl}/v1/evaluation/${evaluation_id}`;
    return this.http.get<Evaluation[]>(url);
  }

  getPatientEvaluations(patientId:string): Observable<Evaluation[]>{
    const url = `${environment.evaluationBaseUrl}/v1/evaluation/patientevaluations/${patientId}`;
    return this.http.get<Evaluation[]>(url);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: error.error 
    });
  };
}
