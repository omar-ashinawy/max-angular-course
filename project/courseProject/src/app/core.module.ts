import {NgModule} from "@angular/core";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {RecipeService} from "./recipes/recipe.service";
import {DataStorageService} from "./shared/data-storage.service";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";
import {AuthService} from "./authentication/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./authentication/auth-interceptor.service";
import {AuthGuardService} from "./authentication/auth-guard.service";

@NgModule({
  providers: [
    RecipeService,
    RecipesResolverService,
    ShoppingListService,
    DataStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuardService]
})
export class CoreModule {

}
