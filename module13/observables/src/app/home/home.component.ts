import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, interval, Observer} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(count=>{
    //   console.log(count);
    // });
    const customObservable = new Observable(observer=>{
      let count = 0;

      setInterval(()=>{
        observer.next(count);
        if (count === 6){
          observer.complete()
        }
        if (count > 4){
          observer.error(new Error('NO NO NO'));
        }
        count++;
      }, 1000);
    });

    this.firstSubscription = customObservable.pipe(filter(data => {
      return data > 0;
    }), map(data=>{
      return 'Round: ' + data;
    })).subscribe(data=>{
      console.log(data);
    }, error => {
      console.log(error.message);
    }, ()=>{
      alert('Completed!!!!')
    });
  }
  ngOnDestroy() {
    this.firstSubscription.unsubscribe();
  }
}
