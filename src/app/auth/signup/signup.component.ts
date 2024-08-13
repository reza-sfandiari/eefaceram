import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { last, take, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'eef-signup',
  standalone: true,
  imports: [ 
    NgSelectComponent,
    NgOptionTemplateDirective,
  
   
    NgLabelTemplateDirective,ReactiveFormsModule,
    FormsModule, NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  them  = localStorage.getItem('theme');

  selectedRole: string = 'admin';

    roles = [
        { id: 'admin', name: 'admin' },
        { id: 'user', name: 'user0' },
       
    ];
    signupForm: any;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private userService: UsersService,
        private toastr: ToastrService,
        private config: NgSelectConfig) {
            this.config.notFoundText = 'یافت نشد';
            this.config.appendTo = 'body';
            // set the bindValue to global config when you use the same 
            // bindValue in most of the place. 
            // You can also override bindValue for the specified template 
            // by defining `bindValue` as property
            // Eg : <ng-select bindValue="some-new-value"></ng-select>
            this.config.bindValue = 'value'; }
    ngOnInit() {
        this.initForm();
   
    }
    initForm() {
        this.signupForm = this.fb.group({
            username: new FormControl(''),
            password: new FormControl(''),
            confirmPassword: new FormControl(''),
            name: new FormControl(''),
            lastName: new FormControl(''),
            status: true,
            role: new FormControl('')
        });
    }
    adduser() {
        if (this.signupForm.invalid) return;
        this.spinner.show();
        this.userService.createUser(this.signupForm.value).pipe(
            take(1),
            tap(() => this.signupForm.reset({ username: '', password: '', confirmPassword: '', name: '', lastName: '', role: '' }))
        ).subscribe((res) => {
            this.toastr.success('کاربر با موفقیت اضافه شد');
            setTimeout(() => {
                this.spinner.hide();
                
            }, 900);
        });
    }


}
