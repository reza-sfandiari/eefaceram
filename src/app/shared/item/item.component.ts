import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { take } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodosService } from '../../core/services/todos.service';

@Component({
  selector: 'eef-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  @Input({ required: true }) todo!: Todo;

  todosService = inject(TodosService);

  updateTodo() {
    this.todosService
      .updateTodo({ ...this.todo, completed: !this.todo.completed })
      .pipe(take(1))
      .subscribe();
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id!).pipe(take(1)).subscribe();
  }
}

