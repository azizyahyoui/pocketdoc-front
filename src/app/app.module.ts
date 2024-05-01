import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './auth/components/reset-password-email/reset-password-email.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdddiplomeComponent } from './auth/components/adddiplome/adddiplome.component';
import { ProfileComponent } from './BackOffice/profile/profile.component';
import { EditprofileComponent } from './BackOffice/editprofile/editprofile.component';
import { ProfilComponent } from './FrontOffice/profil/profil.component';
import { EditprofilComponent } from './FrontOffice/editprofil/editprofil.component';
import { UsersComponent } from './BackOffice/users/users.component';
import { GestionprofileComponent } from './BackOffice/gestionprofile/gestionprofile.component';
import { CalenderComponent } from './rdv/calender/calender.component';
import { ListDoctorComponent } from './rdv/list-doctor/list-doctor.component';
import { CalenderDoctorComponent } from './rdv/calender-doctor/calender-doctor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultationsStatsComponent } from './rdv/consultations-stats/consultations-stats.component';
import {MatCardModule} from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importez le module FullCalendar

import {MatPaginatorModule} from '@angular/material/paginator';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListInscriByuserComponent } from './FrontOffice/Event/list-inscri-byuser/list-inscri-byuser.component';
import { ListEventFrontComponent } from './FrontOffice/Event/list-event-front/list-event-front.component';
import { MapViewComponent } from './FrontOffice/Event/map-view/map-view.component';
import { AddEventComponent } from './BackOffice/Event/add-event/add-event.component';
import { ListEventBackComponent } from './BackOffice/Event/list-event-back/list-event-back.component';
import { ModEventComponent } from './BackOffice/Event/mod-event/mod-event.component';
import { StatEventComponent } from './BackOffice/Event/stat-event/stat-event.component';



@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    ListDoctorComponent,
    CalenderDoctorComponent,
    
    ConsultationsStatsComponent,
    AllTemplateFrontComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    AllTemplateBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    ListEventComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordEmailComponent,
    AdddiplomeComponent,
    ProfileComponent,
    EditprofileComponent,
    ProfilComponent,
    EditprofilComponent,
    UsersComponent,
    GestionprofileComponent,
    ListInscriByuserComponent,
    ListEventFrontComponent,
    MapViewComponent,
    AddEventComponent,
    ListEventBackComponent,
    ModEventComponent,
    StatEventComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatPaginatorModule,
    MatCardModule,FullCalendarModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }