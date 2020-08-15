import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'stretch'
})
export class StretchPipe implements PipeTransform {

  transform(value: string, ...args): any {
    return (!value.includes('Server')) ? (value + ' (NOT A SERVER)') : value;
  }
}

