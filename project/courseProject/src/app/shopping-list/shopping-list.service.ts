import {Subject} from "rxjs";
import {IngredientModel} from "../shared/ingredient.model";
export class ShoppingListService {
  ingredientChanged = new Subject<IngredientModel[]>();
  itemToEdit = new Subject<number>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 3),
    new IngredientModel('Dates', 7)
  ];
  getIngredient(){
    return this.ingredients.slice();
  }
  getIngredientById(id: number){
    return this.ingredients.slice()[id];
  }
  addIngredient(ingredient: IngredientModel){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: IngredientModel[]){
    // console.log(...ingredients); this is an object after slicing
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: IngredientModel){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteItem(id: number){
    this.ingredients.splice(id, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  resetIngredientList(){
    this.ingredients.splice(0);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
