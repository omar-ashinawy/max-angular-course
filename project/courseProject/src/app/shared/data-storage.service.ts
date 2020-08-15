import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Injectable} from "@angular/core";
import {RecipeModel} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../authentication/auth.service";

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }
  storeRecipes(){
    const recipes = this.recipeService.getRecipeList();
    this.http.put('https://angular-course-project-866e6.firebaseio.com/recipes.json', recipes).subscribe(responseData => {
      console.log(responseData);
    });
  }
  fetchRecipes(){
    return this.http.get<RecipeModel[]>('https://angular-course-project-866e6.firebaseio.com/recipes.json').pipe(
      map(recipes => {
      return recipes.map(recipes => {
        return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients: []}; // to ensure that the recipes also contains ingredients even if it was as empty array of ingredients for the app not to break.
      })
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
