import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  constructor(private http:HttpClient) { }

  retriveEvaluationTherapistData(therapistId:String): Observable<Person> {
    const url = `${environment.personBaseUrl}/v1/person/findById/${therapistId}`;
    return this.http.get<Person>(url);
  }

}
