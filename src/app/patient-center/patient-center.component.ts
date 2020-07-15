import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../service/evaluation.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-patient-center',
  templateUrl: './patient-center.component.html',
  styleUrls: ['./patient-center.component.css']
})
export class PatientCenterComponent implements OnInit {

  teste =  'testando';
  evaluations;
  loaded;
  
  constructor(private evaluationService:EvaluationService, private sessionService:SessionService) { }

  ngOnInit(): void {
    // this.evaluationService.evaluationList(this.sessionService.userId)
    //   .subscribe(
    //     data => {
    //       this.evaluations = data;
    //       this.loaded = true;
    //     }, error => {
    //       this.loaded = true;
    //     }
    //   );
      
    //   console.log("minhas avaliações:");
    //   console.log(this.evaluations);
  }

}
