import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutesModule} from "./app-routes.module";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import * as fromApp from "./store/app.reducer";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
