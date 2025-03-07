import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStops'
})
export class ShowStopsPipe implements PipeTransform {

  transform(stopsQuantity: number): string {
    return stopsQuantity === 0 ? 'Nonstop' : String(stopsQuantity);
  }
}
