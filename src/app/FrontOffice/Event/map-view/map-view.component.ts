import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {

  constructor(
    public dialogRef: MatDialogRef<MapViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }
  
  ngOnInit(): void {
    this.initMap(this.data.x, this.data.y);
  }
    
  initMap(x: number, y: number) {
    let marqueur: L.Marker;
    let map = L.map("maCarte").setView([33.892166, 9.561555], 6);
   
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
   
    const lat = Number(x);
    const lng = Number(y);
   
    marqueur = L.marker([lat, lng], { draggable: true }).addTo(map);
   
    marqueur.on("dragend", (e) => {
       const newPos = e.target.getLatLng();
       document.querySelector<HTMLInputElement>("#lat1")!.value = newPos.lat.toString();
       document.querySelector<HTMLInputElement>("#lon1")!.value = newPos.lng.toString();
    });
   }

   openGoogleMaps() {
    const url = `https://www.google.com/maps/@${this.data.x},${this.data.y},16z?entry=ttu`;
    window.open(url, '_blank'); // Ouvre l'URL dans un nouvel onglet
  }  

  closeDialog() {
    this.dialogRef.close(); // Ferme la fenêtre modale
  }

}
