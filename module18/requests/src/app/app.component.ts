import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {PostModel} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isFetching: boolean = false;
  loadedPosts = [];
  error = null;
  errSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errSubscription = this.postService.errorSubject.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.onFetchPosts();
  }

  onCreatePost(postData: PostModel) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }
  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onErrorHandling(){
    this.error = null;
  }

  ngOnDestroy() {
    this.errSubscription.unsubscribe();
  }
}
