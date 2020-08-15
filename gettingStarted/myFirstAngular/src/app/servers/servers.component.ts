import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styles: [`
  h1{
    color: red;
  }
  `]
})
export class ServersComponent implements OnInit{
  allowNewServers:boolean = false;
  serverCreationStatus:string = 'No server is created';
  serverName:string = '';
  serverCreated:boolean = false;
  constructor() {
    setTimeout(()=>{
      this.allowNewServers = true;
    },2000)
  }
  ngOnInit() {
  }
  onServerCreation(){
    this.serverCreated = true;
    this.serverCreationStatus = 'One server is created successfully !';
  }
  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  onServerReset(){
    this.serverCreated = false;
    this.serverCreationStatus = 'No server is created';
    this.serverName = '';
  }
}
