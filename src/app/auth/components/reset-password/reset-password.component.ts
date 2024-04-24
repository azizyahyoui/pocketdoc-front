import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  eyeIcon: string = "fa-eye-slash";
  type: string = "password";
  istext: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private authService: JwtService, 
              private router: Router,
              private emailService: EmailService) { // Injecter le service EmailService
    this.resetForm = this.formBuilder.group({
      resetToken: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }

    const resetToken = this.resetForm.value.resetToken;
    const newPassword = this.resetForm.value.newPassword;

    this.authService.resetPassword(resetToken, newPassword).subscribe(
      (response) => {
        console.log('Mot de passe réinitialisé avec succès:', response);
        // Gérer les cas de succès ici si nécessaire
        this.router.navigate(['/login']); // Rediriger vers la page de connexion après la réinitialisation du mot de passe
      },
      (error) => {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        // Gérer les erreurs ici si nécessaire
      }
    );
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }

  resendEmail() {
    const email = this.emailService.getEmail(); // Obtenir l'e-mail enregistré dans le service EmailService
    if (email) {
      this.authService.forgotPassword(email).subscribe(
        (response) => {
          console.log('Email envoyé avec succès:', response);
          // Gérer les cas de succès ici si nécessaire
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
      );
    }
  }
}
