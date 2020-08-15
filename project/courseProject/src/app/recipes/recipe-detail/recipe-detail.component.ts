import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeToView:RecipeModel;
  id:number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.recipeToView = this.recipeService.getRecipeById(this.id);
    });
  }
  toShoppingList(){
    this.recipeService.addToShoppingService(this.recipeToView.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  OnDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
