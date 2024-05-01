import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './auth/components/reset-password-email/reset-password-email.component';
import { AdddiplomeComponent } from './auth/components/adddiplome/adddiplome.component';
import { ProfileComponent } from './BackOffice/profile/profile.component';
import { EditprofileComponent } from './BackOffice/editprofile/editprofile.component';
import { ProfilComponent } from './FrontOffice/profil/profil.component';
import { EditprofilComponent } from './FrontOffice/editprofil/editprofil.component';
import { UsersComponent } from './BackOffice/users/users.component';
import { GestionprofileComponent } from './BackOffice/gestionprofile/gestionprofile.component';
import { RoleGuardService } from './auth/service/role-guard.service';
import { CalenderComponent } from './rdv/calender/calender.component';
import { ConsultationsStatsComponent} from './rdv/consultations-stats/consultations-stats.component';
import { ListDoctorComponent } from './rdv/list-doctor/list-doctor.component';
import { CalenderDoctorComponent } from './rdv/calender-doctor/calender-doctor.component';
import { ListEventFrontComponent } from './FrontOffice/Event/list-event-front/list-event-front.component';
import { ListInscriByuserComponent } from './FrontOffice/Event/list-inscri-byuser/list-inscri-byuser.component';
import { AddEventComponent } from './BackOffice/Event/add-event/add-event.component';
import { ModEventComponent } from './BackOffice/Event/mod-event/mod-event.component';
import { ListEventBackComponent } from './BackOffice/Event/list-event-back/list-event-back.component';
import { StatEventComponent } from './BackOffice/Event/stat-event/stat-event.component';





const routes: Routes = [
  {path:"",component:AllTemplateFrontComponent,
  canActivate: [RoleGuardService], // Utilisez le garde de routage ici
  data: {
    expectedRoles: ['USER', 'DOCTOR'] // Spécifiez le rôle attendu pour accéder à cette route
  },
  children :[
    { path:"profile",component:ProfilComponent},
    { path :"editProfil", component:  EditprofilComponent},

    { path :"events", component:ListEventFrontComponent},
    { path :"listInscri",component:ListInscriByuserComponent}
    
  ]
},
    

{
  path: "admin", component: AllTemplateBackComponent,
  canActivate: [RoleGuardService], // Utilisez le garde de routage ici
  data: {
    expectedRoles: ['ADMIN']// Spécifiez le rôle attendu pour accéder à cette route
  },
  children: [
    { path: "event", component: ListEventComponent },
    { path: "profil", component: ProfileComponent },
    { path: "editProfile", component: EditprofileComponent },
    { path: "users", component: UsersComponent },
    { path: "gestionprofile/:id", component: GestionprofileComponent },
    
    { path:"ajouter",component:AddEventComponent},
    { path:"modif/:id",component:ModEventComponent},
    { path:"listEvent",component:ListEventBackComponent},
    { path:"stat",component:StatEventComponent}
  ]
},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path :"reset-password", component:  ResetPasswordComponent},
  { path :"reset-password-email", component:  ResetPasswordEmailComponent},
  { path :"adddiplome", component:  AdddiplomeComponent},
  {path:"calender/:id",component: CalenderComponent},
    
  {path:"list", component:ListDoctorComponent},
  {path:"calenderdoc", component:CalenderDoctorComponent},
  {path:"stat", component:ConsultationsStatsComponent},

  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
