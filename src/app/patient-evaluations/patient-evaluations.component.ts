import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { EvaluationService } from '../service/evaluation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-evaluations',
  templateUrl: './patient-evaluations.component.html',
  styleUrls: ['./patient-evaluations.component.css']
})
export class PatientEvaluationsComponent implements OnInit {
  patientEvaluations = [];
  noneEvaluations;
  loaded: boolean = false;
  public months: {[key: number]: string} = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10:"Outubro",
    11:"Novembro",
    12:"Dezembro"
  }
  getEvaluationsParam: string;
  constructor(private session:SessionService, private evaluationService:EvaluationService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'PATIENT'){
      this.getEvaluationsParam = this.session.getUserLogged();
    }else if(localStorage.getItem('role') == 'THERAPIST'){
      this.getEvaluationsParam = this.activatedRoute.snapshot.paramMap.get("patientId");
    }
    this.evaluationService.getPatientEvaluations(this.getEvaluationsParam)
    .subscribe(
      data => {
        this.loaded = true;
        this.patientEvaluations = data;
        if(this.patientEvaluations.length == 0){
          this.noneEvaluations = true;
        }
        console.log(this.patientEvaluations);
      }, error => {
        this.loaded = true;
        console.log("Erro ao retornar as classificações do paciente");
      }
    );
  }

  dateConversion(date:string){
    let str = date; 
    let splitted = str.split("-", 3); 
    let day = splitted[2].substring(0,2);
    let month = splitted[1];
    let year = splitted[0];
    return day + " de " + this.months[parseInt(month)] + " de " + year;
  } 

  redirectToEvaluationDetails(id) {
    this.router.navigate(['evaluation-details',id]);
  }

}
