import { Injectable } from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import { RecipeModel } from "./recipe.model";
import { IngredientModel } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  constructor(private shoppingService: ShoppingListService, private store: Store<fromApp.AppState>) {}

  private recipes: RecipeModel[] = [
  //   new RecipeModel('Test1', 'This is a test1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new IngredientModel('Meat', 1), new IngredientModel('Fries', 12)]),
  //   new RecipeModel('Test2', 'This is a test2', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new IngredientModel('Apple', 3), new IngredientModel('Banana', 14)]),
  //   new RecipeModel('Test3', 'This is a test3', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new IngredientModel('Tomatoes', 8), new IngredientModel('Strawberries', 66)]),
  //   new RecipeModel('Test4', 'This is a test4', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new IngredientModel('Potatoes', 4), new IngredientModel('Sauce', 43)])
   ];
  recipesChanged = new Subject<RecipeModel[]>();
  getRecipeList(){
    return this.recipes.slice();
  }
  addToShoppingService(ingredients: IngredientModel[]){
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    //this.shoppingService.addIngredients(ingredients);
  }
  getRecipeById(id: number){
    return this.recipes.slice()[id];
  }
  addRecipe(recipe: RecipeModel){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: RecipeModel){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: RecipeModel[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
