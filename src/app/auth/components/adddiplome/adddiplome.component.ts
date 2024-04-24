import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.file = event.target.files[0]; // Access the first file in the FileList
    console.log('Selected file:', this.file.name);
  }
  
  onSubmit() {
    console.log(this.file);
    console.log(this.email);
  
    this.jwtService.uploadProfileImage(this.email, this.file).subscribe({
      next: (response) => {
        // Handle server response if necessary
        console.log('Upload response:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error during upload:', error);
      }
    });
  }
  

}
