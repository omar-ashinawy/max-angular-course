import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


export class LoginInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Watch out! Request is coming!!!");
    console.log(req.url);
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response){
        console.log("Body has arrived: ");
        console.log(event.body);
      }
    }));
  }
}
