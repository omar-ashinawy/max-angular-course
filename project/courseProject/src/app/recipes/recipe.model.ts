import {IngredientModel} from "../shared/ingredient.model";

export class RecipeModel {
  name:string;
  description:string;
  imgPath:string;
  ingredients: IngredientModel[];

  constructor(name:string, description:string, path:string, ingredients:IngredientModel[]) {
    this.name = name;
    this.description = description;
    this.imgPath = path;
    this.ingredients = ingredients;
  }
  //
  // getRecipeName(){
  //   return this.name;
  // }
  // getRecipeDesc(){
  //   return this.description;
  // }
  // getRecipeImg(){
  //   return this.imgPath;
  // }
  //
  // setRecipeName(name:string){
  //   this.name = name;
  // }
  // setRecipeDesc(description:string){
  //   this.description = description;
  // }
  // setRecipeImg(path:string){
  //   this.imgPath = path;
  // }
}
