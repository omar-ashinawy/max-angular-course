import {Injectable} from "@angular/core";
import {PostModel} from "./post.model";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {

  errorSubject = new Subject<string>();
  constructor(private http: HttpClient) {
  }
  createAndStorePost(title: string, content: string){
    const postData: PostModel = {title: title, content: content};
    this.http.post<{name: string}>('https://module18-dedd6.firebaseio.com/post.json', postData).subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.errorSubject.next(error.message);
    });
  }
  fetchPost(){
    const headers = new HttpHeaders({'This-is-my-first-header': 'Hello-world'});
    let params = new HttpParams().set('print', 'pretty');
    params = params.append('custom', 'key');
    return this.http.get <{[key: string]: PostModel}> ('https://module18-dedd6.firebaseio.com/post.json',
      {
        headers: headers,
        params: params,
        observe: "response", // get the whole response not only the body.
        responseType: 'json' // convert the body into a json file (default).
      })
      .pipe(map(responseData => {
        const postArray: PostModel[] = [];
        for (const key in responseData.body){
          if (responseData.body.hasOwnProperty(key)){
            postArray.push({...responseData.body[key], id: key});
          }
        }
        return postArray;
      }), catchError(errorResponse => {
        console.log(errorResponse);
        return throwError(errorResponse); // throwError: Returns an error observable
    }));
  }
  deletePost(){
    return this.http.delete('https://module18-dedd6.firebaseio.com/post.json', {observe: "events"}).pipe(
      tap(event => {
        if (event.type === HttpEventType.Sent){
          console.log(event.type);
        }
        if (event.type === HttpEventType.Response){
          console.log(event.body)
        }
      })
    );
    //   {
    //     observe: 'events'
    //   }).pipe(tap{
    //
    // });
    // //deletes the post.json file
    //Don't forget the return
    //يا غبي يا متخلف لازم ترجع ال observable
  }
}
