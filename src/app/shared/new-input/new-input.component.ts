import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { take, tap } from 'rxjs';
import { TodosService } from '../../core/services/todos.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'eef-new-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-input.component.html',
  styleUrl: './new-input.component.scss',
})
export class NewInputComponent {
  todosService = inject(TodosService);
  fb = inject(FormBuilder);

  newTodoForm = this.fb.group({
    completed: new FormControl(false),
    text: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    if (this.newTodoForm.invalid) return;

    this.todosService
      .createTodo(this.newTodoForm.value as Todo)
      .pipe(
        take(1),
        tap(() => this.newTodoForm.reset({ completed: false, text: '' }))
      )
      .subscribe();
  }
}
