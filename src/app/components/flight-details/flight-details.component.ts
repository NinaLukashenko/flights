import { Component, Input } from '@angular/core';
import { Flight, FlightOffer } from '../../types/flights.type';
import { ShowStopsPipe } from "../../pipes/show-stops.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-details',
  imports: [
    ShowStopsPipe,
    DatePipe,
  ],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent {
  @Input({ required: true }) flight!: Flight;
}
