import {Directive, ViewContainerRef} from "@angular/core";


@Directive({
  selector: '[authErrorDir]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
