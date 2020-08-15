import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];
  onIntervalChanged(increment:number){
    // console.log(increment)
    if(increment % 2 === 0)
    {
      this.evenNumbers.push(increment);
    }
    else
    {
      this.oddNumbers.push(increment);
    }
  }
}
