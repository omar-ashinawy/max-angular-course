import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PostService} from "./post.service";
import {AuthInterceptorService} from "./AuthInterceptorService";
import {LoginInterceptorService} from "./loginInterceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, { // Order of interceptors matters!
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
