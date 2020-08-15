import {Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";
import {EventEmitter} from "@angular/core";

@Injectable()
export class AccountsService {
  constructor(private loggingService:LoggingService) {
  }
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Test Account',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  serviceUpdated = new EventEmitter<string>();
  addAccount(name:string, status:string){
    this.accounts.push({name: name, status: status});
    this.loggingService.logServerStatus(status);
  }
  updateAccount(id:number, status:string){
    this.accounts[id].status = status;
    this.loggingService.logServerStatus(status);
  }
}
