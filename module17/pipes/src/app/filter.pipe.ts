import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, criteria: string): any {
    if(value.length === 0 || filterString === undefined || filterString === ''){
      return value;
    }
    let filteredArray = [];
    for (let item of value){
      if (item[criteria] === filterString){
        filteredArray.push(item);
      }
    }
    return filteredArray;
  }
}
