import {OnInit} from "@angular/core";
import {Component} from "@angular/core";


@Component({
  selector: 'app-angularStyle',
  templateUrl: './angularStyle.component.html',
  styleUrls: ['./angularStyle.component.css']
})
export class angularStyleComponent implements OnInit{
  allowNewServers = false;
  servers = ['Test 1', 'Test 2'];

  constructor() {
    setTimeout(()=>{
      this.allowNewServers = true;
    }, 2000);
  }

  onServerCreation(){
    this.servers.push('Test New');
  }
  ngOnInit() {
  }
}
