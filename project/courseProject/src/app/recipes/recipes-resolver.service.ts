import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeModel} from "./recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";

@Injectable()
export class RecipesResolverService implements Resolve<RecipeModel[]>{
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    if(this.recipeService.getRecipeList().length === 0){
      return this.dataStorageService.fetchRecipes();
    }
    else {
      return this.recipeService.getRecipeList();
    }
  }
}
