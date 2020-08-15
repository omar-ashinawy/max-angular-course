import {AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Can change the view encapsulation property supported by Angular, this property allows the elements of the same component to have styles only from the style sheet of this component although the whole Angular project is a single page app. Angular does this by emulating the shadow DOM supported by some browsers. Native uses the shadow DOM, None allows the style sheets to cascade and Emulate is the default.
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit{
  serverElements = [/*{type: 'server', name: 'TestServer', content: 'AlsoTest'}*/];
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
  ngOnInit() {
  }

  ngAfterViewInit() // from here up, we can access any DOM element, before this, no view content is rendered. We can access elements on the same component template via @ViewChild.
  {
  }

  ngAfterContentInit() // from here up, we can access any DOM element that is contained using ng-content, before this, no content is rendered. We can access elements from the calling component template via @ContentChild.
  {
  }
}
