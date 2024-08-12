import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'eef-signup',
  standalone: true,
  imports: [  NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,ReactiveFormsModule,
    FormsModule, NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  them  = localStorage.getItem('theme');

  selectedRole: number = 1;

    roles = [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user0' },
       
    ];

}
