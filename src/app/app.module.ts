import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatMenuModule,
  MatProgressBarModule,
  MatCard,
  MatCardModule,
  MatDialogModule,
  MatTreeModule,
  MatExpansionModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './service/session.service';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFilterPipe } from './patient-list/patient-filter.pipe';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OpenModalService } from './shared/modal-dialog/open-modal-service.service';
import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { EvaluationResultComponent } from './evaluation-result/evaluation-result.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PatientEvaluationsComponent } from './patient-evaluations/patient-evaluations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PatientRegisterComponent,
    PatientListComponent,
    PatientFilterPipe,
    EditProfileComponent,
    EvaluationComponent,
    EvaluationListComponent,
    EvaluationResultComponent,
    ForgotPasswordComponent,
    PatientEvaluationsComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatMenuModule,
    LayoutModule,
    MatProgressBarModule,
    MatCardModule,
    MatTreeModule
  ],
  providers: [
    SessionService,
    MatDatepickerModule,
    OpenModalService,
    EditProfileComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ModalDialogComponent]
})
export class AppModule { }
