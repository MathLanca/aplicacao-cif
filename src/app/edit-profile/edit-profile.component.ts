import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../interfaces/person';
import { Address} from '../interfaces/address';
import { CepService } from '../service/cep.service';
import { MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/format-datepicker';
import { SessionService } from '../service/session.service';
import { AuthService } from '../service/auth.service';
import { EditProfileService } from '../service/edit-profile.service';
import { RemoveAccountService } from '../service/remove-account.service';
import { Router } from '@angular/router';
import { OpenModalService } from '../shared/modal-dialog/open-modal-service.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class EditProfileComponent implements OnInit {
  user:Person;
  personForm: FormGroup;
  addressForm: FormGroup;
  cepNotFound = false;
  equalPass = true;
  loaded = false;
  loading = false;
  patient = null;
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP', 'TO'];
  Roles: any = ['Admin', 'Paciente', 'Terapeuta'];
  role:String = this.application.role;
  blockProfileEdition:boolean;


  genders: Gender[] = [
    { value: 'F', viewValue: 'Feminino' },
    { value: 'M', viewValue: 'Masculino' },
    { value: 'O', viewValue: 'Não informar' }
  ];
 
  
  constructor(
    private removeAccount: RemoveAccountService,
    private cepService:CepService, 
    private snackbar:MatSnackBar, 
    private _authservice:AuthService, 
    private session:SessionService,
    private router: Router,
    private editProfileService: EditProfileService,
    private openModalService:OpenModalService,
    private application:AppComponent
    ) { 
  }

  @Input() person:Person = <Person>{};
  @Input() address:Address = <Address>{};

  searchCEP() {
    this.cepService.searchCEP(this.addressForm.controls.postalCode.value)
      .subscribe(
        (res: any) => {
          if (res.erro == true) {
            this.cepNotFound = true;
            this.snackbar.open('Não foi possível localizar o CEP', 'Dismiss', {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
          } else {
            this.cepNotFound = false;
            this.fillAddressFields(res);
          }
        },
        err => {
          this.snackbar.open('Não foi possível localizar o CEP', 'Dismiss', {
            duration: 2000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  validatePass() {
    this.equalPass = this.personForm.value.password === this.personForm.value.confirmPass;
  }

  fillAddressFields(cep: any) {
    this.addressForm.controls['publicPlace'].setValue(cep.logradouro);
    this.addressForm.controls['neighborhood'].setValue(cep.bairro);
    this.addressForm.controls['city'].setValue(cep.localidade);
    this.addressForm.controls['state'].setValue(cep.uf);
  }

  ngOnInit(){
    if(this.role == 'PATIENT'){
      this.blockProfileEdition = true;
    }
    console.log(this.role);
    this._authservice.getUserData(this.session.userId)
          .subscribe(data => {
            this.user = data;
            this.loaded = true;
          });
    this.personForm = this.createPersonForm();
    this.addressForm = this.createAddressForm();
  }

  createPersonForm() {
    return new FormGroup({
      'email': new FormControl(this.person.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.person.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      'confirmPass': new FormControl(this.person.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      'firstName': new FormControl({value:this.person.firstName, disabled:this.blockProfileEdition}, [Validators.required]),
      'lastName': new FormControl({value:this.person.lastName, disabled:this.blockProfileEdition}, [Validators.required]),
      'cpf': new FormControl({value:this.person.lastName, disabled:this.blockProfileEdition}, [Validators.required, Validators.pattern('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')]),
      'sex': new FormControl({value:this.person.sex, disabled:this.blockProfileEdition}, [Validators.required]),
      'telephoneNumber': new FormControl(this.person.telephoneNumber, [Validators.required, Validators.maxLength(14)]),
      'birthDate': new FormControl({value:this.person.birthDate, disabled:this.blockProfileEdition}, [Validators.required]),
      'patient': new FormGroup({
        'therapistID': new FormControl(''),
        'note': new FormControl('')
      })
    });
  }

  createAddressForm() {
    return new FormGroup({
      'publicPlace': new FormControl(this.address.publicPlace, [Validators.required]),
      'houseNumber': new FormControl(this.address.houseNumber, [Validators.required]),
      'neighborhood': new FormControl(this.address.neighborhood, [Validators.required]),
      'city': new FormControl(this.address.city, [Validators.required]),
      'state': new FormControl(this.address.state, [Validators.required]),
      'postalCode': new FormControl(this.address.postalCode, [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
    });
  }

  onSubmit() {
    this.loading = true;
    this.person = this.personForm.value;
    this.address = this.addressForm.value;
    this.person.address = this.address;
    this.person.patient = this.patient;
    this.person.birthDate = new Date(this.person.birthDate).toISOString();
    this.editProfileService.updateProfile(this.person)
      .subscribe(
        (res: any) => {
          this.loading = true;
          this.snackbar.open('Dados atualizados!', 'OK', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
          this.router.navigateByUrl('');
        },
        (erro: any) => {
          this.loading = false;
          this.snackbar.open('Não foi possivel atualizar os dados', 'OK', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
          console.log(erro);
        }
      )
  }

  cancelUpdate(){
    this.router.navigate[''];
  }

}

interface Gender {
  value: string;
  viewValue: string;
}