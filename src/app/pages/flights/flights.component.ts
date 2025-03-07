import { Component } from '@angular/core';
import { FlightsListActionsPanelComponent } from "../../components/flights-list-actions-panel/flights-list-actions-panel.component";
import { FlightsListComponent } from "../../components/flights-list/flights-list.component";

@Component({
  selector: 'app-flights',
  imports: [FlightsListActionsPanelComponent, FlightsListComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent {

}
