import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InscriptionService } from 'src/app/service/inscription.service';

@Component({
  selector: 'app-list-inscri-byuser',
  templateUrl: './list-inscri-byuser.component.html',
  styleUrls: ['./list-inscri-byuser.component.css']
})
export class ListInscriByuserComponent {
  @Input() inscriptions: any[] = []; // Entrée pour recevoir les inscriptions du composant principal
  @Input() eventsInscr: any[] = [];

  constructor( 
    private service:InscriptionService,
    private router:Router,
  ) {} 

    ngOnInit(): void {
      this.getAllInscriByUserId();
    }

    /*

    closeDialog() {
      this.dialogRef.close(); // Ferme la fenêtre modale
    }*/

    getAllInscriByUserId(){
      const userId = localStorage.getItem('id');
      this.service.getAllInscriByUserID(userId).subscribe(
        res => {
          this.eventsInscr = res;
         // this.openPopup();
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }

    goBack(){
      this.router.navigate(['/events'])
    }

}
