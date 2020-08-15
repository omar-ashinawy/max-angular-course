// import {Directive, HostBinding, HostListener} from "@angular/core";
// @Directive({
//   selector: '[appDropdown]'
// })
//
// export class DropdownDirective{
//   constructor() {}
//   @HostBinding('class.open') isOpen = false;
//   @HostListener('click') toggleDropdown(){
//     this.isOpen = !this.isOpen;
//   }
// }

// This code below uses the event listening on the document to close it from everywhere on the document
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
