import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormat } from 'intl';
import { ReactiveFormsModule } from '@angular/forms';

@Pipe({
  name: 'trackTime'
})
export class TrackTimePipe implements PipeTransform {

  transform(value: number): string {
    var formatter: NumberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, minimumIntegerDigits: 2 })
    var minutes: number = Math.floor(value / 60);
    var seconds: number = Math.floor(value % 60);
    return(`${formatter.format(minutes)}:${formatter.format(seconds)}`);
  }

}
