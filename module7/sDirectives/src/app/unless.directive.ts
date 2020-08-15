import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appUnless]' //square brackets is a must to inform Angular that this is directive used with *
})
export class UnlessDirective implements OnInit{
  @Input() set appUnless(condition: boolean){
    if(!condition){
      this.refToViewContainer.createEmbeddedView(this.refToTemplate);
    }else{
      this.refToViewContainer.clear();
    }
  }
  constructor(private refToTemplate:TemplateRef<any>, private refToViewContainer:ViewContainerRef) {
  }
  ngOnInit() {
  }
}
