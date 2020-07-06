import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../service/evaluation.service';
import { Answer } from '../interfaces/answer';
import { Question } from '../interfaces/question';
import { Questions } from '../interfaces/questions';
import { QuestionService } from '../service/question.service';
import { TherapistService } from '../service/therapist.service';
import { Person } from '../interfaces/person';
import { RegisterComponent } from '../register/register.component';
declare var xepOnline: any;
@Component({
  selector: 'app-evaluation-result',
  templateUrl: './evaluation-result.component.html',
  styleUrls: ['./evaluation-result.component.css']
})
export class EvaluationResultComponent implements OnInit {
  private evaluationId:string = "";
  public evaluation:any;
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
  };

  public object: {[key: string]: string} = {
    "Assistência Social":'CRESS',   
    "Biologia":'CRBio', 
    "Biomedicina":"CRBM", 
    "Educação Física": "CREF", 
    "Enfermagem": 'COREN', 
    'Farmácia':'CRF',
    'Fisioterapia':'CREFITO',
    'Fonoaudiologia':'CREFONO',
    "Medicina": 'CRM', 
    'Medicina Veterinária':'CRMV',
    'Nutrição':'CRN',
    'Odontologia':'CRO',
    'Psicologia':'CRP',
    'Terapia Ocupacional':'COFFITO'
  };

  regionalID:String;
  evaluationTherapistData:Person;

  constructor(private evaluationService:EvaluationService, private therapistService:TherapistService) { }

  ngOnInit(): void {
    this.evaluationId = location.href.substring(location.href.lastIndexOf('/') + 1);
    this.evaluationService.getEvaluation(this.evaluationId)
    .subscribe(
      data => {
        this.evaluation = data;
        this.loaded = true;
        this.therapistService.retriveEvaluationTherapistData(this.evaluation.therapistId)
        .subscribe(
          data => {
            this.evaluationTherapistData = data;
            console.log(this.evaluationTherapistData);
            this.regionalID = this.object[this.evaluationTherapistData.professionalData.occupation];
            console.log("Ocupacao profissional " + this.regionalID);
            this.loaded = true;
          }
        ); 
      }
    ); 
    
  }

  download(){
    var file = "Avaliação Funcional - " + this.evaluation.patientName;
    return xepOnline.Formatter.Format('print', {render:'download', filename: file});
  }

  dateConversion(date:string){
    let str = date; 
    let splitted = str.split("-", 3); 
    let day = splitted[2].substring(0,2);
    let month = splitted[1];
    let year = splitted[0];
    return day + " de " + this.months[parseInt(month)] + " de " + year;
  } 
  
}
