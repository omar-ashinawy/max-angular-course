import {Component} from "@angular/core";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverName: string = 'Test';
  serverId: number = 10;
  serverStatus: string = '';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  getServerName(){
    return this.serverName;
  }
  getServerId(){
   return this.serverId;
  }
  getColor(){
    return this.serverStatus === 'online'? 'green':'red';
  }
}
