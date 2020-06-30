import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter  } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Person } from '../interfaces/person';
import { Address } from '../interfaces/address';
import { ProfessionalData } from '../interfaces/professionalData';
import { CepService } from '../service/cep.service';
import { MatSnackBar, MatStepper } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { RegisterService } from '../service/register.service';
import { AuthService } from '../service/auth.service';
import { SessionService } from '../service/session.service';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/format-datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class RegisterComponent implements OnInit {

  cepNotFound = false;
  equalPass = true;
  loading = false;
  registered = false;
  personForm: FormGroup;
  addressForm: FormGroup;
  professionalForm: FormGroup;
  states: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'TO'];
  Roles: any = ['Admin', 'Paciente', 'Terapeuta'];
  occupations: any[] = [ 
    'Assistência Social', 
    'Biologia', 
    'Biomedicina',
    'Educação Física',
    'Enfermagem',
    'Farmácia',
    'Fisioterapia',
    'Fonoaudiologia',
    'Medicina',
    'Medicina Veterinária',
    'Nutrição',
    'Odontologia',
    'Psicologia',
    'Terapia Ocupacional'
  ];
  regionalID:String = "Identificação profissional";
  
  object: {[key: string]: string} = {
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

  
  

  genders: Gender[] = [
    { value: 'F', viewValue: 'Feminino' },
    { value: 'M', viewValue: 'Masculino' },
    { value: 'O', viewValue: 'Não informar' }
  ];

  

  constructor(private cepService: CepService, private router: Router,
    private sessionService: SessionService, private authService: AuthService,
    private registerService: RegisterService, private snackbar: MatSnackBar,
    private _adapter: DateAdapter<any>) {
    this.personForm = this.createPersonForm();
    this.addressForm = this.createAddressForm();
    this.professionalForm = this.createProfessionalForm();
  }


  @Input() person: Person = <Person>{};
  @Input() address: Address = <Address>{};
  @Input() professionalData: ProfessionalData = <ProfessionalData>{};
  @ViewChild('cpf') cpfElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('stepper') private myStepper: MatStepper;

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

  createPersonForm() {
    return new FormGroup({
      'email': new FormControl(this.person.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.person.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      'confirmPass': new FormControl(this.person.password, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      'firstName': new FormControl(this.person.firstName, [Validators.required]),
      'lastName': new FormControl(this.person.lastName, [Validators.required]),
      'cpf': new FormControl(this.person.lastName, [Validators.required, Validators.pattern('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')]),
      'sex': new FormControl(this.person.sex, [Validators.required]),
      'telephoneNumber': new FormControl(this.person.telephoneNumber, [Validators.required, Validators.maxLength(14)]),
      'birthDate': new FormControl(this.person.birthDate),
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

  createProfessionalForm() {
    return new FormGroup({
      'occupation': new FormControl(this.person.occupation, [Validators.required]),
      'professionalID': new FormControl({value: this.person.professionalID, disabled: true} , [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      'workPlace': new FormControl(this.person.workPlace, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
    });
  }

  ngOnInit() {
    if (this.sessionService.getUserLogged() != null) {
      return this.router.navigate(['home']);
    }
    this.onChanges();
  }

  onChanges(): void{
    this.professionalForm.get('occupation').valueChanges.subscribe(val => {
      if (this.professionalForm.get('occupation').value != null){
        this.professionalForm.get('professionalID').enable();
        this.regionalID = this.object[this.professionalForm.get('occupation').value];
      }
    });
  }

  goBack2Login() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.loading = true;
    this.person = this.personForm.value;
    this.address = this.addressForm.value;
    this.professionalData = this.professionalForm.value;
    this.person.address = this.address;
    this.person.active = true;
    this.person.birthDate = new Date(this.person.birthDate).toISOString();
    this.registerService.register(this.person)
      .subscribe(
        (res: any) => {
          this.snackbar.open('Cadastro realizado com sucesso!', 'Accept', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
          this.login(this.person.cpf, this.person.password);
        },
        (erro: any) => {
          this.loading = false;
          console.log(erro);
          if (erro.message === "EMAIL_ALREADY_REGISTERED") {
            this.myStepper.previous();
            this.snackbar.open('Email já cadastrado!', 'dismiss', {
              duration: 4000,
              panelClass: ['red-snackbar']
            });
          }
          if (erro.message === "CPF_ALREADY_REGISTERED") {
            this.myStepper.previous();
            this.snackbar.open('Cpf já cadastrado!', 'dismiss', {
              duration: 4000,
              panelClass: ['red-snackbar']
            });
          }
        }
      )
  }

  private login(login: string, password: string) {
    this.authService.login(login, password)
      .subscribe(
        resp => {
          this.loading = false;
          this.sessionService.saveUserLoggedId(resp.id, resp.firstName, )
          localStorage.setItem('role','THERAPIST')
          this.router.navigate(['home']);
        }, error => {
          this.loading = false;
          console.log(error);
          this.snackbar.open('Não foi possivel realizar o login', 'Dismiss', {
            duration: 2000,
            panelClass: ['red-snackbar']
          });
          this.router.navigate(['']);
        }
      );
  }
}

interface Gender {
  value: string;
  viewValue: string;
}