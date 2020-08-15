import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  constructor(private renderer:Renderer2, private elementRef: ElementRef) {}
   ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
   }
   @Input() defaultColor:string = 'transparent'; //Directives can also have their custom property bindings like components!
   @Input('appBetterHighlight') highlightColor:string = 'red';
   @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'; //this makes a class(directive) attribute and binds it to an existing element property.
   @HostListener('mouseenter') entered(){
     // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
     this.backgroundColor = this.highlightColor;

   }
   @HostListener('mouseleave')left(){
     // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent')
     this.backgroundColor = this.defaultColor;
   }
}
