import { Component, Input } from '@angular/core';
import { OptionComponent } from "../../../../shared/option/option.component";
import { UserListComponent } from "../user-list/user-list.component";
import { NewUser } from '../../../../models/user';
import { UseroptionComponent } from "../useroption/useroption.component";

@Component({
  selector: 'eef-user-card',
  standalone: true,
  imports: [OptionComponent, UserListComponent, UseroptionComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({ required: true }) users!: NewUser[];
  @Input({ required: true }) usersLeft!: number;
  @Input({ required: true }) filteredUsers!: NewUser[];
}
