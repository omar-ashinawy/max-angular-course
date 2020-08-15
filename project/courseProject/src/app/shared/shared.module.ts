import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {AuthErrorComponent} from "./auth-error/auth-error.component";

@NgModule({
  declarations: [
    AuthErrorComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [CommonModule],
  exports: [
    AuthErrorComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  entryComponents: [AuthErrorComponent]
})
export class SharedModule {

}
