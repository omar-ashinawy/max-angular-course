import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuardService} from "../authentication/auth-guard.service";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "./recipes-resolver.service";


const routes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent}, // new must come first as it might be interpreted as an id if id came first.
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutesModule {

}
