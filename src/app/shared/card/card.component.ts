import { Component, inject } from '@angular/core';
import { TodosService } from '../../core/services/todos.service';
import { take } from 'rxjs';
import { NewInputComponent } from "../new-input/new-input.component";
import { ListComponent } from '../list/list.component';
import { OptionComponent } from '../option/option.component';
import { NavComponent } from "../../main/layout/nav/nav.component";

@Component({
  selector: 'eef-card',
  standalone: true,
  imports: [NewInputComponent, ListComponent, OptionComponent, NavComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  todosService = inject(TodosService);

  get todos() {
    return this.todosService.todos;
  }

  get filteredTodos() {
    return this.todosService.filteredTodos;
  }

  get todosLeft() {
    return this.todosService.todosLeft;
  }

  ngOnInit(): void {
    this.todosService.getTodos().pipe(take(1)).subscribe();
  }
}
