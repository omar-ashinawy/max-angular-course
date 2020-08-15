import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() element:{type:string, name:string, content:string};

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() // from here up, we can access any DOM element, before this, no view content is rendered. We can access elements on the same component template via @ViewChild.
  {
  }

  ngAfterContentInit() // from here up, we can access any DOM element that is contained using ng-content, before this, no content is rendered. We can access elements from the calling component template via @ContentChild.
  {
  }
}
