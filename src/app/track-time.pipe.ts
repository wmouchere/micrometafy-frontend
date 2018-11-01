import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormat } from 'intl';
import { ReactiveFormsModule } from '@angular/forms';

@Pipe({
  name: 'trackTime'
})
export class TrackTimePipe implements PipeTransform {

  transform(value: number, unit: string): string {
    var formatter: NumberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, minimumIntegerDigits: 2 })
    var minutes: number;
    var seconds: number;
    switch(unit) {
      case "milliseconds":
      case "ms":
        value /= 1000;
        minutes = Math.floor(value / 60);
        seconds = Math.floor(value % 60);
        break;
      case "seconds":
      case "s":
        minutes = Math.floor(value / 60);
        seconds = Math.floor(value % 60);
        break;
      default:
        minutes = NaN;
        seconds = NaN;
    }
    return(`${formatter.format(minutes)}:${formatter.format(seconds)}`);
  }

}
