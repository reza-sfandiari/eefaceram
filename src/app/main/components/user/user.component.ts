import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NewUser, User } from '../../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from "../../../shared/list/list.component";
import { OptionComponent } from "../../../shared/option/option.component";
import { NewInputComponent } from "../../../shared/new-input/new-input.component";
import { UsersService } from '../../../core/services/users.service';
import { take } from 'rxjs';
import { UserCardComponent } from "./user-card/user-card.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { SignupComponent } from "../../../auth/signup/signup.component";

@Component({
  selector: 'eef-user',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule, NgxSpinnerModule, ListComponent, OptionComponent, NewInputComponent, UserCardComponent, HeaderComponent, SignupComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  usersService = inject(UsersService);
  get users() {
    return this.usersService.users;
  }
  get filteredUsers() {
    console.log(this.usersService.filteredUsers())
    return this.usersService.filteredUsers;

  }
  get usersLeft() {
    return this.usersService.usresLeft;
  }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(take(1)).subscribe();
  }

  

 

}
