import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Person } from '../interfaces/person';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  
  @Input() person: Person = <Person>{};

  public loading = false;
  constructor(public snackBar: MatSnackBar, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.authService.forgotPassword(this.person.cpf).subscribe(
      data => {
        this.snackBar.open('Senha enviada no email cadastrado!', 'Fechar', {
          duration: 4000,
          horizontalPosition: 'center',
        });
        this.loading = false;
        this.router.navigateByUrl('');
      },
      err => {
        this.snackBar.open('Houve um erro ao enviar o email!', 'Fechar', {
          duration: 4000,
          horizontalPosition: 'center',
        });
        this.loading = false;
      }
    )
    
  }
}
