import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription:Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //الفرق الكبير بين السناب شوت و الobservable هو إن السناب شوت مش بتحمل الكومبوننت كلها من أول وجديد عشان تجيب البرامز
    this.user = {id: this.route.snapshot.params['id'], name: this.route.snapshot.params['name']};
    // this.user.id = this.route.snapshot.params['id'];
    // this.user.name = this.route.snapshot.params['name']; //this would not work, user must be accessed as an object.
    this.paramsSubscription = this.route.params.subscribe((params: Params)=>{
      this.user.id = params['id'];
      this.user.name = params['name'];
    });// subscribe deals with an observable
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
