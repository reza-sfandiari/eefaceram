import { Component, inject, Input } from '@angular/core';
import { TodosService } from '../../core/services/todos.service';
import { TodoOption } from '../../models/todo-option';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eef-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {
  @Input({ required: true }) todosLeft!: number;

  todosService = inject(TodosService);

  get selectedOption() {
    return this.todosService.selectedOption;
  }

  todoOptions: TodoOption[] = ["همه","فعال","کامل شده"];

  onSelectOption(option: TodoOption) {
    this.todosService.selectTodoOption(option);
  }

  onClearCompleted() {
    this.todosService.clearCompletedTodo().pipe(take(1)).subscribe();
  }
}

