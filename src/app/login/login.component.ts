import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material';
import { SessionService } from '../service/session.service';
import { Person } from '../interfaces/person';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  callRegisterComponent = false;
  loading = false
                    
  @Input() person: Person = <Person>{};
  @Output() personOut: EventEmitter<Person> = new EventEmitter();
  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar, private sessionService: SessionService) { }

  ngOnInit() {
    if(this.sessionService.getUserLogged() != null){
      return this.router.navigate(['home']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.person.login, this.person.password)
      .subscribe(
        res => {
          this.loading = false;
          this.sessionService.saveUserLoggedId(res.id, res.firstName);
          console.log('successful login!');
          this.personOut.emit(this.person);
          this.router.navigate(['home']);
        }, error => {
          this.loading = false;
          console.log(error);
          this.snackbar.open('Login ou Senha incorreto!', 'Dismiss', {
            duration: 2000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
