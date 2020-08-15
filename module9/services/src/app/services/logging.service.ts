import {Injectable} from "@angular/core";

@Injectable()

export class LoggingService {
  constructor() {
  }
  logServerStatus(status:string):void{
    console.log('A server status changed, new status: ' + status);
  }
}
