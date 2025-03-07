import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, Observable } from 'rxjs';
import { Filters, FlightOffer, Sort } from '../types/flights.type';


@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private fligts$ = new BehaviorSubject<FlightOffer[] | null>(null);

  private displayedFligts$ = new BehaviorSubject<FlightOffer[] | null>(null);

  private sort$ = new BehaviorSubject<Sort>({type: 'price', direction: 'asc'});

  private filters$ = new BehaviorSubject<Filters>({price: {from: 0, to: 5000}, stops: ['all']});

  private itemsCount$ = new BehaviorSubject<number>(5);

  constructor(
    private http: HttpClient,
  ) {
    combineLatest([
      this.fligts$.pipe(filter(data => data !== null)),
      this.sort$,
      this.filters$,
      this.itemsCount$,
    ]).subscribe(([flights, sort, filters, itemsCount]) => {
      const displayedFlights = this.filterFlights(this.sortFlights(flights, sort), filters).splice(0, itemsCount);

      this.displayedFligts$.next(displayedFlights);
    })
  }

  loadFlights() {
    this.http.get<FlightOffer[]>('https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json')
      .subscribe(
        {
          next: (data) => this.fligts$.next(data),
          error: (error) => console.error(error),
        }
      )
  }

  getDisplyedFlights$(): Observable<FlightOffer[] | null> {
    return this.displayedFligts$.asObservable();
  }

  getFilters$(): Observable<Filters> {
    return this.filters$.asObservable();
  }

  getSort$(): Observable<Sort> {
    return this.sort$.asObservable();
  }

  setStopsFilters(stops: string[]) {
    this.filters$.next({...this.filters$.value, stops});
  }

  setPriceFilters(price: {from: number, to: number}) {
    this.filters$.next({...this.filters$.value, price});
  }

  setSort(sort: Sort) {
    this.sort$.next(sort);
  }

  setItemsCount() {
    this.itemsCount$.next(this.itemsCount$.value + 5);
  }

  private sortFlights(flights: FlightOffer[], { type, direction }: Sort): FlightOffer[] {
    if (type === 'price') {
      return flights.sort((a, b) => (a.price - b.price) * (direction === 'asc' ? 1 : -1));
    }
    if (type === 'departure_time') {
      return flights.sort((a, b) => (this.getTimeFromISOString(a.flights[0].departure_time) - this.getTimeFromISOString(b.flights[0].departure_time)) * (direction === 'asc' ? 1 : -1));
    }

    return flights;
  }

  private filterFlights(flights: FlightOffer[], { price, stops }: Filters ) {
    return flights
      .filter(item => item.price >= price.from && item.price <= price.to)
      .filter(item => stops.includes('all') || stops.length === 0 || (stops.includes(String(item.flights[0].stops)) && stops.includes(String(item.flights[1].stops))));
  }

  private getTimeFromISOString(date: string): number {
    return new Date(date).getTime();
  }

}
