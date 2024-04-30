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



const routes: Routes = [
  {path:"",component:AllTemplateFrontComponent,
  canActivate: [RoleGuardService], // Utilisez le garde de routage ici
  data: {
    expectedRoles: ['USER', 'DOCTOR'] // Spécifiez le rôle attendu pour accéder à cette route
  },
  children :[
    { path:"profile",component:ProfilComponent},
    { path :"editProfil", component:  EditprofilComponent}
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
    { path: "gestionprofile/:id", component: GestionprofileComponent }
  ]
},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path :"reset-password", component:  ResetPasswordComponent},
  { path :"reset-password-email", component:  ResetPasswordEmailComponent},
  { path :"adddiplome", component:  AdddiplomeComponent},
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
