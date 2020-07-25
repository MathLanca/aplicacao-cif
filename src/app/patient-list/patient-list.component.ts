import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { PatientListService } from '../service/patient-list.service';
import { MatSnackBar } from '@angular/material';
import { OpenModalService } from '../shared/modal-dialog/open-modal-service.service';
import { RemoveAccountService } from '../service/remove-account.service';
import {Title} from "@angular/platform-browser";
import { Patient } from '../interfaces/patient';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  searchTerm: string;
  public patients = [];
  title:String = "Listagem de paciente";
  loading: boolean;
  constructor(
    private openModalService: OpenModalService,
    private session: SessionService,
    private router: Router,
    private _patientlist: PatientListService,
    private removeAccount: RemoveAccountService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.session.getUserLogged() == null) {
      this.router.navigate(['']);
    }

    if (localStorage.getItem('role') == 'PATIENT') {
      this.router.navigate(['evaluations']);
    }
    this.loading = true;
    this._patientlist.getPatientList()
      .subscribe(
        data => {
          this.loading = false;
          this.patients = data;
          for(let i = 0; i < this.patients.length; i++){
            if(this.patients[i].profilePic == null){
              this.patients[i].profilePic = '../assets/images/profile_icon.png';
            }
          }
        }
      );
  }

  deletePatient(id: String) {
    const data = {
      text: 'Tem certeza que deseja excluir o paciente?',
      title: 'Excluir paciente',
      buttonYes: 'Sim',
      buttonNo: 'Não'
    }
    this.openModalService.openDialog(data).subscribe(res => {
      if (res) {
        this.removeAccount.removeAccount(id)
          .subscribe(
            () => {
              location.reload();
              this.snackbar.open('Cadastro removido', 'OK ', {
                duration: 2000,
              });
            }
          );
      } else {
        console.log('Paciente não excluido');
      }
    })
  }

  newEvaluation(patient: Person) {
    this.router.navigate(['evaluation'], { state: { patient: patient } })
  }

  redirectToPatientEvaluations(id: String){
    this.router.navigate(['patient-evaluations', {patientId: id}]);
  }

}
