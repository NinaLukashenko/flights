export type FlightOffer = {
  id: number;
  price: number;
  flights: Flight[];
}

export type Flight = {
  airline: string;
  arrival_airport: string;
  arrival_date: string;
  arrival_time: string;
  departure_airport: string;
  departure_date: string;
  departure_time: string;
  duration_minutes: number
  stops: number;
}

export type Sort = {
  type: 'price' | 'departure_time' | string;
  direction: 'asc' | 'desc' | string;
}

export type Filters = {
  price: {from: number, to: number},
  stops: string[];
}
