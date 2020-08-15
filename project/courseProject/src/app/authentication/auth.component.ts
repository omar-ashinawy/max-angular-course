import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService, ResponseBody} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthErrorComponent} from "../shared/auth-error/auth-error.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObservable: Observable<ResponseBody>;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) authErrorPlaceholder: PlaceholderDirective;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }
  ngOnInit() {
  }

  onSwitchLoginMode() {
    this.isLoginMode =! this.isLoginMode;
  }

  onFormSubmit(authForm: NgForm) {
    if(authForm.invalid){
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;

    if(this.isLoginMode){
      this.authObservable = this.authService.login(email, password);
    }
    else{
      this.authObservable = this.authService.signUp(email, password);
    }

    this.authObservable.subscribe(responseBody => {
      this.isLoading = false;
      console.log(responseBody);
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      this.addAuthErrorComp(this.error);
      console.log(errorMessage);
    });
    authForm.reset();
  }

  private addAuthErrorComp(errorMessage: string){
    const authErrorComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AuthErrorComponent);
    const viewContainerRef = this.authErrorPlaceholder.viewContainerRef;
    viewContainerRef.clear();
    const authErrorCompRef = viewContainerRef.createComponent(authErrorComponentFactory);
    authErrorCompRef.instance.message = errorMessage;
    this.closeSub = authErrorCompRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      viewContainerRef.clear();
    });
  }
  onCloseErrorComp() {
    this.error = null;
  }

  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
