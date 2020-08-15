import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms-exercise';

  onFormSubmit(form: NgForm){
    console.log('Project Name: ' + form.value.projectName + ", Email: " + form.value.email + ", Project Status: " + form.value.status);
  }

}
