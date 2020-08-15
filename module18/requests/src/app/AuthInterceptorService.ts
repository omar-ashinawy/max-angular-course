import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


export class AuthInterceptorService implements HttpInterceptor{
  // interceptors will intercept all the requests when introduced.
  // interceptor can interact with the response as well as the request.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const editedReq = req.clone({headers: req.headers.append('my-second-header', 'omar')});
    return next.handle(editedReq);
  }
}
