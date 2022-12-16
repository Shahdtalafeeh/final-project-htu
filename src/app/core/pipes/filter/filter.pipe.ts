import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterValue: string): any[] {

    if(value.length==0 || !filterValue){
      return value;
    }
        return value.filter(p=>p.toLowerCase().includes(filterValue.toLowerCase()));

  }

}
