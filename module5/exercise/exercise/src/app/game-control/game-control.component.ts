import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  interval;
  @Output() intervalChanged = new EventEmitter<number>();
  increment:number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  onGameStarted(){
    this.interval = setInterval(() => {
      this.intervalChanged.emit(this.increment + 1);
      this.increment = this.increment + 1;
    }, 1000)
  }
  onGameStopped(){
    clearInterval(this.interval);
  }
}
