import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../authentication/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {map} from "rxjs/operators";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthorized = false;
  userSub: Subscription;
  // @Output() recipesCalled = new EventEmitter<boolean>();
  // @Output() shoppingCalled = new EventEmitter<boolean>();
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(userObject => {return userObject.user})
    ).subscribe(user => {
      this.isAuthorized = !!user; //user ? true: false
    });
  }
  // onRecipesCalled(){
  //   this.recipesCalled.emit(true);
  // }
  // onShoppingCalled(){
  //   this.shoppingCalled.emit(true);
  // }
  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
