import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { PatientListService } from '../service/patient-list.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  searchTerm: string;
  public patients = [];

  constructor(private session:SessionService, private router:Router, private _patientlist:PatientListService){}

  ngOnInit(){
    console.log(this.session.getUserLogged());
    if(this.session.getUserLogged() == null){
      this.router.navigate(['']);
    }

    this._patientlist.getPatientList()
        .subscribe(data => this.patients = data);
  }

}
