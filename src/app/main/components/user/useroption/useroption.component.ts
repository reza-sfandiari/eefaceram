import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { UserOption } from '../../../../models/user-option';
import { take } from 'rxjs';

@Component({
  selector: 'eef-useroption',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './useroption.component.html',
  styleUrl: './useroption.component.scss'
})
export class UseroptionComponent {
  @Input({ required: true }) userLeft!: number;
  usersService = inject(UsersService);

  get selectedOption() {
    return this.usersService.selectedOption;
  }

  userOptions: string[] = ["همه","فعال","غیر فعال"];

  onSelectOption(option: any) {
    this.usersService.selectUserOption(option);
  }

  onClearCompleted() {
    this.usersService.clearCompletedUser().pipe(take(1)).subscribe();
  }



}
