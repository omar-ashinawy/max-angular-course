import {Component, Input} from "@angular/core";
import {RecipeModel} from "../../recipe.model";


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent{
  constructor() {
  }
 @Input() recipe:RecipeModel;
 @Input() index:number;
}