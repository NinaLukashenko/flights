import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlightsService } from '../../services/flights.service';


@Component({
  selector: 'app-flights-list-actions-panel',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './flights-list-actions-panel.component.html',
  styleUrl: './flights-list-actions-panel.component.scss'
})
export class FlightsListActionsPanelComponent {
  fb = new FormBuilder();

  readonly sort = this.fb.group({
    sort: ''
  })

  readonly stops = this.fb.group({
    all: false,
    '0': false,
    '1': false,
    '2': false,
  });

    constructor(
      private service: FlightsService,
    ) {
      this.service.getSort$()
        .subscribe(
          {
            next: (sort) => {
              this.sort.setValue({
                sort: `${sort.type}_${sort.direction}`
              })
            }
          }
        )

      this.service.getFilters$()
        .subscribe(
          {
            next: (filters) => {
              this.stops.setValue({
                all: filters.stops.includes('all'),
                '0': filters.stops.includes('0'),
                '1': filters.stops.includes('1'),
                '2': filters.stops.includes('2'),
              });
            }
          }
        )
    }

  onStopsChanged() {
    const filteredStops = Object.keys(this.stops.value).filter(item => this.stops.value[(item as 'all' | '0' | '1' | '2')]);

    this.service.setStopsFilters(filteredStops)
  }

  onSortChanged() {
    const [type, direction ] = this.sort.controls.sort.value?.split('_') || [];

    this.service.setSort({type, direction})
  }
}