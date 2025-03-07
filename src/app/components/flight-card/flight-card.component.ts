import { Component, Input } from '@angular/core';
import { FlightOffer } from '../../types/flights.type';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  imports: [ 
    FlightDetailsComponent,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  @Input({ required: true }) flight!: FlightOffer;

  constructor(private router: Router) { }

  onBookClicked() {
    this.router.navigateByUrl('/traveler');
  }
}
