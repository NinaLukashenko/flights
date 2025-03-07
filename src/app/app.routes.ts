import { Routes } from '@angular/router';
import { TravelerComponent } from './pages/traveler/traveler.component';
import { FlightsComponent } from './pages/flights/flights.component';

export const routes: Routes = [
  {path: '', redirectTo: '/flights', pathMatch: 'full'},
  { path: 'flights', component: FlightsComponent },
  { path: 'traveler', component: TravelerComponent },
];
