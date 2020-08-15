import {Component, OnInit} from '@angular/core';
import {LoggingService} from "../services/logging.service";
import {AccountsService} from "../services/accounts-service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent implements OnInit{
  constructor(private statusLogger: LoggingService, private accountsService:AccountsService) {
  }
  ngOnInit() {
    this.accountsService.serviceUpdated.subscribe((status: string)=> alert('New Status: ' + status));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
  }
}
