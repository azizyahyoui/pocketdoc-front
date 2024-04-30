import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailService } from '../../service/email.service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-adddiplome',
  templateUrl: './adddiplome.component.html',
  styleUrls: ['./adddiplome.component.css']
})
export class AdddiplomeComponent {
  email!: string;
  file!: File;
  fileSelected: boolean = false;


  constructor(
    // Utilisez le service UserService pour envoyer le fichier
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService,
    private jwtService: JwtService
  
  ) { }


  ngOnInit() {
    this.email = this.emailService.getEmail();
    console.log(this.email);
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('Selected file:', this.file ? this.file.name : 'No file selected');
    this.fileSelected = !!this.file;
  }
  
  onSubmit() {
    console.log(this.file);
    console.log(this.email);
  
    this.jwtService.uploadProfileImage(this.email, this.file).subscribe({
      next: (response) => {
        // Handle server response if necessary
        console.log('Upload response:', response);
        alert('Votre compte est bien enregistré. Vous devez attendre la validation par l\'administrateur.');
        this.router.navigate(['/login']);

      
      },
      error: (error) => {
        // Handle error
        console.error('Error during upload:', error);
        alert('Votre compte est bien enregistré. Vous devez attendre la validation par l\'administrateur.');
        this.router.navigate(['/login']);
        // Afficher un message d'erreur à l'utilisateur
      }
    });
  }
  

}
