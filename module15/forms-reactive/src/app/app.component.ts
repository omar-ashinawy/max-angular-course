import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loginForm: FormGroup; // form is a ((group)) of controls at the end.
  genders = ['male', 'female'];
  forbiddenNames = ['KKK', 'MMM'];

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesFn.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncForbiddenEmails)
      }),
      'gender': new FormControl('male', [Validators.required]),
      'hobbies': new FormArray([])
    });
    this.loginForm.statusChanges.subscribe((status)=>{console.log(status)});
  }

  getControls(){
    return (<FormArray>this.loginForm.get('hobbies')).controls;
  }

  onFormSubmit(){
    console.log(this.loginForm);
  }

  onAddHobbies(){
    const hobbyControl = new FormControl(null, Validators.required);
    this.getControls().push(hobbyControl);
  }

  forbiddenNamesFn(control: FormControl): {[x: string]: boolean}{
    if (this.forbiddenNames.includes(control.value)){
      return {'NameIsForbidden': true};
    }
    return null;
  }
  asyncForbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          resolve({'EmailIsForbidden': true});
        }
        else{
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
