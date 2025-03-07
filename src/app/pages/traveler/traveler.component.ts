import { Component } from '@angular/core';
import { TravelerFormComponent } from "../../components/traveler-form/traveler-form.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-traveler',
  imports: [
    TravelerFormComponent,
    MatCardModule,
  ],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent {

}
