import { Component, OnChanges, Injectable, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry, MatSidenav, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { SessionService } from './service/session.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { OpenModalService } from './shared/modal-dialog/open-modal-service.service';
import { RemoveAccountService } from './service/remove-account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnChanges {
  title = 'Aplicação Core Set CIF geriátrico';
  public pageTitle: string;
  public pageTitlePT: string;

  public greetings: string;
  private hours: number;
  public role: string;
  public isLogged: boolean;
  public openMenu: boolean;
  
  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
    private route: Router, 
    private sessionService: SessionService, 
    private breakpointObserver: BreakpointObserver,
    private openModalService:OpenModalService,
    private removeAccount: RemoveAccountService,
    private snackbar:MatSnackBar,
    private session:SessionService,
    private location:Location
    ) {
    iconRegistry.addSvgIcon(
      'mack_white',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/mack_white.svg')
    );
    route.events.subscribe(val => {
      this.pageTitle = window.location.pathname.replace("/","");
      var title = window.location.pathname.replace("/","");
      console.log(title);
      if(title.indexOf("evaluation-details") !== -1){
        this.pageTitlePT = "Detalhes da avaliação";
      } else {
        switch(title){
          case("patientList"): 
            return this.pageTitlePT = 'Pacientes';
          case("editProfile"): 
            return this.pageTitlePT = 'Editar Perfil';
          case("patientRegister"): 
            return this.pageTitlePT = 'Cadastro de Pacientes';
          case("patientList"): 
            return this.pageTitlePT = 'Listagem de pacientes';
          case("evaluations"): 
            return this.pageTitlePT = 'Avaliações';
          case("evaluation"): 
            return this.pageTitlePT = 'Nova Avaliação';
          case("evaluation-list"): 
            return this.pageTitlePT = 'Consulta avaliação';
          case("register"): 
            return this.pageTitlePT = 'Cadastro';
          case("home"):
            return this.pageTitlePT = '';
        }
      }
      
    });
  }

  @ViewChild('drawer') drawerElement: MatSidenav;

  onActivate(componentReference) {
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.isLogged = this.islogged();
    this.greetings = this.setGreetigns();
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    this.isLogged = this.islogged();
    this.greetings = this.setGreetigns();
    this.role = localStorage.getItem('role');
    if (this.sessionService.getUserLogged() == null) {
      return this.route.navigate(['']);
    }
    
  }


  openSideMenu(){
    if(this.drawerElement != undefined){
      this.drawerElement.open();
    }
  }

  islogged() {
    if (this.sessionService.getUserLogged() != null) {
      return true;
    }
    return false;
  }

  goHome(){
    if(localStorage.getItem('role') == 'PATIENT'){
      this.route.navigateByUrl('evaluations');
    }else{
      this.route.navigateByUrl('home');
    }
  }

  setGreetigns() {
    this.hours = new Date().getHours();
    if (this.hours >= 3 && this.hours < 12) {
      return "Bom Dia, " + localStorage.name + "!";
    }
    if (this.hours >= 12 && this.hours < 18) {
      return "Boa Tarde, " + localStorage.name + "!";
    }
    if (this.hours >= 18 || this.hours < 3) {
      return "Boa Noite, " + localStorage.name + "!";
    }

  }

  viewProfile() {
    this.route.navigate(['editProfile']);
  }

  logout() {
    this.sessionService.logoutUser();
    location.reload();
    this.route.navigate(['']);
  }

  redirectToPatientRegister() {
    this.route.navigate(['patientRegister']);
  }

  redirectToEvaluation() {
    this.route.navigate(['evaluation']);
  }

  redirectToEvaluationList() {
    this.route.navigate(['evaluation-list']);
  }

  redirectToPatientList(){
    this.route.navigate(['patientList']);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    deleteTherapist(){
      const data = {
        text: 'Tem certeza que deseja excluir seu cadastro?',
        title: 'Excluir cadastro',
        buttonYes: 'Sim',
        buttonNo: 'Não'
      }
      this.openModalService.openDialog(data).subscribe(res=>{
        if(res){
          console.log("exclusao solicitada")
          this.removeAccount.removeAccount(this.session.userId)
            .subscribe(
              (res: any) => {
                location.reload();
                this.snackbar.open('Cadastro removido', 'OK ', {
                  duration: 2000,
                });
                this.session.logoutUser();
              }
            );
        }else{
          console.log('Cadastro não excluído');
        }
      })
    }
  }