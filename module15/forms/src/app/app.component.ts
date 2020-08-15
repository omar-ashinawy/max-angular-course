import {Component, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') loginForm: NgForm;
  genders = ['Male', 'Female'];
  secretAnswer:string = '';

  user = {
    userName: '',
    userEmail: '',
    secretQuestion: '',
    secretAnswer: '',
    gender: ''
  };
  submitted = false;
  suggestUserName() {
    const suggestedName = 'Omar';
    // setValue => must specify the whole form object, patchValue => only specify the name of the field you want to change.
    // this.loginForm.setValue({
    //   userData: {
    //     userName: suggestedName,
    //     userEmail: ''
    //   },
    //   secret: 'pet',
    //   secretAnswer:'',
    //   gender: 'Male'
    // });
    this.loginForm.form.patchValue({
      userData: {
        userName: suggestedName
      }
    });
  }
  // onSubmit(form: NgForm){
  //   console.log(form);
  // }
  onSubmit(){
    this.submitted = true;
    this.user.userName = this.loginForm.value.userData.userName;
    this.user.userEmail = this.loginForm.value.userData.userEmail;
    this.user.secretQuestion = this.loginForm.value.secret;
    this.user.secretAnswer = this.loginForm.value.secretAnswer;
    this.user.gender = this.loginForm.value.gender;
  }
}
