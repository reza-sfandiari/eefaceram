import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'eef-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input({ required: true }) todos!: Todo[];
}

