import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm) { // Vérifie que loginForm est défini
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          if (response.token != null) {
            const jwtToken = response.token;
            const ID = response.id
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('id', ID);

            // Vérifier le rôle de l'utilisateur et rediriger en conséquence
            switch (response.role) {
              case 'ADMIN':
                this.router.navigateByUrl("/admin");
                break;
                case 'USER':
                  this.router.navigateByUrl("/");
                  break;
            }
          }
        }
      );
    } else {
      console.error("this.loginForm is undefined"); // Gestion de l'erreur
    }
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }
}
