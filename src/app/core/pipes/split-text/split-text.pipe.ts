import { Pipe, PipeTransform } from '@angular/core';
import { indexOf, lastIndexOf } from 'lodash';

@Pipe({
  name: 'splitText'
})
export class SplitTextPipe implements PipeTransform {

  transform(value: string, numberOfChar: number): unknown {
    return value.substring(0,numberOfChar) + '...';
  }

}


