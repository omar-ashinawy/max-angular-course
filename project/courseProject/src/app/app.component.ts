import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from "./authentication/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId) {
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId))
    {
      this.authService.autoLogin();
    }
  }
}
