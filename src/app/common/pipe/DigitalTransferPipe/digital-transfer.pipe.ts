import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'digitalTransfer'
})
export class DigitalTransferPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value == 0) {
      return 'A';
    } else if (value == 1) {
      return 'B';
    } else if (value == 2) {
      return 'C';
    } else if (value == 3) {
      return 'D';
    } else if (value == 4) {
      return 'E';
    } else if (value == 5) {
      return 'F';
    } else if (value == 6) {
      return 'G';
    }

  }

}
