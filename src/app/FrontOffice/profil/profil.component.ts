import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  profileImage!: string;
  userId: any;
  user:any;
  email!: string;
  file1!: File; // Correction ici
  
  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService
  ) { 
  }

  ngOnInit() {
    this.fetchProfileImage();
  }

  fetchProfileImage() {
    // Get the user ID from local storage
    this.userId = localStorage.getItem('id');

    // Check if the user ID is available
    if (!this.userId) {
      console.error('User ID not found in local storage');
      return;
    }
  
    // Call the service method to fetch the user by ID
    this.jwtService.getUserById(this.userId).subscribe(
      (response) => {
        console.log('Service response:', response); // Log the response before conversion
        // Assuming the response contains the profile image as a base64 string
        this.user = response.ourUsers;
        this.email = this.user.email;
      },
      (error) => {
        console.error('Error fetching profile image:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.file1 = event.target.files[0]; // Access the first file in the FileList
    console.log('Selected file:', this.file1.name);
  }

  changeProfileImage1() {
    console.log(this.file1);
    console.log(this.email);
  
    this.jwtService.uploadProfileImage1(this.email, this.file1).subscribe({
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
