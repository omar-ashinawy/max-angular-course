import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions"
import * as fromApp from "../../store/app.reducer"

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: IngredientModel;
  constructor(private shoppingService: ShoppingListService,
              private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(state => {
      if(state.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = state.editedIngredient;
        this.editedItemIndex = state.editedIngredientIndex;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }else {
        this.editMode = false;
      }
    });

    // this.subscription = this.shoppingService.itemToEdit.subscribe((id: number) => {
    //   this.editMode = true;
    //   this.editedItemIndex = id;
    //   this.editedItem = this.shoppingService.getIngredientById(this.editedItemIndex);
    //   this.shoppingListForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount
    //   })
    // });
  }

  onAddIngredientItem(form: NgForm){
    const newIngredient = new IngredientModel(form.value.name, form.value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({index: this.editedItemIndex, newIngredient: newIngredient}));
      // this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onDeleteItem(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.editedItemIndex));
    // this.shoppingService.deleteItem(this.editedItemIndex);
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onResetForm(){
    this.shoppingListForm.reset();
    this.shoppingService.resetIngredientList();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
