import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs';
import { FlightsService } from '../../services/flights.service';
import { FlightOffer } from '../../types/flights.type';
import { FlightCardComponent } from "../flight-card/flight-card.component";
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flights-list',
  imports: [
    FlightCardComponent,
    NgFor,
    MatButtonModule,
    NgIf,
],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.scss'
})
export class FlightsListComponent implements OnInit {
  flights: FlightOffer[] | null = null;

  constructor(
    private service: FlightsService,
  ) {
    this.service.getDisplyedFlights$()
      .pipe(
        filter((data) => data !== null),
      )
      .subscribe(
        {
          next: (data) => this.flights = data
        }
      )
  }

  ngOnInit(): void {
    this.service.loadFlights();
  }

  onShowMoreClicked() {
    this.service.setItemsCount();
  }
}
