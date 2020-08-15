import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthService} from "./auth.service";
import * as fromApp from "../store/app.reducer"
@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(userObject => {return userObject.user}),
      map(user => {
      return !!user ? true: this.router.createUrlTree(['/auth']);
    }));
  }
}
