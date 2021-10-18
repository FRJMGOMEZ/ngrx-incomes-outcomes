import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {

  transform(items:any, by:string, order:'ascendant'| 'descendant'='ascendant'): any[] {
    return by ? Object.keys(items[0]).reduce((acum, key) => {
      if (by === key) {
        let sorted = items.sort((a, b) => a[key] > b[key] ? (order === 'ascendant' ? -1 : 1) : (order === 'ascendant' ? 1 : -1) );
        acum = sorted;
      }
      return acum
    }, []) : [...items];
  }

}
