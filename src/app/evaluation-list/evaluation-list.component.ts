import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../service/evaluation.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {
  public dataSource = [];
  displayedColumns: string[] = ['therapistId', 'patientName', 'date', 'location', 'view'];
  therapistName = localStorage.name;
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

  
  constructor(private evaluationService:EvaluationService, private route:Router) { }

  ngOnInit(): void {
    this.dateConversion("2020-05-31T20:15:37.217");
    this.evaluationService.evaluationList()
      .subscribe(
        data => {
          this.dataSource = data
        }
      );
  }

  redirectToEvaluationDetails(id) {
    this.route.navigate(['evaluation-details',id]);
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
