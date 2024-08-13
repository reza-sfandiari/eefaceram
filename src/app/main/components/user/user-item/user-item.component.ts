import { Component, inject, Input } from '@angular/core';
import { NewUser } from '../../../../models/user';
import { UsersService } from '../../../../core/services/users.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eef-user-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  @Input({ required: true }) user!: NewUser;

  usersService = inject(UsersService);

  updateUser() {
    this.usersService.updateUser({
      ...this.user,
      status: !this.user.status
    }).pipe(take(1)).subscribe();
      
  }

  deleteUser() {
    this.usersService.deleteUser(this.user.id!).pipe(take(1)).subscribe();
     console.log(this.user)
  }

}
