import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { PatientListService } from '../service/patient-list.service';
import { MatSnackBar, MatStepper } from '@angular/material';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private session:SessionService, private router:Router){}

  ngOnInit(){
    console.log(this.session.getUserLogged());
    if(this.session.getUserLogged() == null){
      this.router.navigate(['']);
    }

  }

}
