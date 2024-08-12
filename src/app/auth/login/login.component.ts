import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'eef-login',
  standalone: true,
  imports: [  ReactiveFormsModule,
    FormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit {
  loginForm: any;
  user?: User;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.initForm();
   
  }
  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  login() {
    this.spinner.show();
    this.user = this.loginForm.value;
    
    this.authService.signIn(this.user as User);
    
    this.toastr.success('ورود با موفقیت');
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.router.navigate(['/home']);
    }, 900);
    
  }
}

