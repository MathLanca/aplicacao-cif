import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root'
})
export class PatientListService {

  constructor(private session:SessionService, private http: HttpClient) { }

  getPatientList(): Observable<Person[]> {
    const url = `${environment.personBaseUrl}/v1/person/findPatientsByTherapist/${this.session.userId}`;
    return this.http.get<Person[]>(url);
  }
}



