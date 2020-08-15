import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercise';
  secretDisplayed:boolean = false;
  logTime:number = 0;
  logs = [];

  logged(){
    this.logTime = this.logTime + 1;
    this.logs.push(this.logTime);
  }
}
