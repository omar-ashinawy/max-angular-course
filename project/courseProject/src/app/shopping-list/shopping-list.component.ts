import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: IngredientModel[]}>;
  // igChangedSubscription: Subscription;
  constructor(private shoppingService: ShoppingListService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredient();
    // this.igChangedSubscription = this.shoppingService.ingredientChanged.subscribe((ingredients: IngredientModel[])=>{
    //   this.ingredients = ingredients;
    // });
  }
  ngOnDestroy() {
    // this.igChangedSubscription.unsubscribe();
  }
  onEditItem(id: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
    // this.shoppingService.itemToEdit.next(id);
  }
}
