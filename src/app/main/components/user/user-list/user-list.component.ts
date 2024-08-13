import { Component, Input } from '@angular/core';
import { NewUser } from '../../../../models/user';
import { UserItemComponent } from "../user-item/user-item.component";

@Component({
  selector: 'eef-user-list',
  standalone: true,
  imports: [UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input({ required: true }) users!: NewUser[];
}
