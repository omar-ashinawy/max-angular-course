import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.css']
})
export class AuthErrorComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() {
  }
  onClose(){
    this.close.emit();
  }
}
