import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Output('svCreated')serverCreated = new EventEmitter<{serverName: string, serverContent: string}>(); //we can not listen to an event of child of child. Event emitters emits events for one level up.
  @Output('bpCreated')blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName = '';
  newServerContent = '';
  @ViewChild('serverName') serverName: ElementRef;
  @ViewChild('serverContent') serverContent: ElementRef;
  constructor() {}

  ngOnInit(): void //runs after the constructor of the component
  {
  }
  ngAfterViewInit() // from here up, we can access any DOM element, before this, no view content is rendered. We can access elements on the same component template via @ViewChild.
  {
  }

  ngAfterContentInit() // from here up, we can access any DOM element that is contained using ng-content, before this, no content is rendered. We can access elements from the calling component template via @ContentChild.
  {
  }

  onAddServer(serverName:HTMLInputElement, serverContent:HTMLInputElement) {
    // this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent}) //Normal two-way binding
    // this.serverCreated.emit({serverName: serverName.value, serverContent: serverContent.value}) //local reference passing
    this.serverCreated.emit({serverName: this.serverName.nativeElement.value, serverContent: this.serverContent.nativeElement.value}) //DOM element referencing using @ViewChild decorator. Note that this is an element Reference (ElementRef which is an angular type). from this reference we can access the native element that has the local reference we called @viewChild on.
  }

  onAddBlueprint(serverName:HTMLInputElement, serverContent:HTMLInputElement) {
    // this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent}) //Normal two-way binding
    // this.blueprintCreated.emit({serverName: serverName.value, serverContent: serverContent.value}) //local reference passing
    this.blueprintCreated.emit({serverName: this.serverName.nativeElement.value, serverContent: this.serverContent.nativeElement.value}) //DOM element referencing using @ViewChild decorator. Note that this is an element Reference (ElementRef which is an angular type). from this reference we can access the native element that has the local reference we called @viewChild on.
  }
}
