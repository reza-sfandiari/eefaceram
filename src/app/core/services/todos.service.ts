
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, from, mergeMap, tap } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodosStorageService } from './todos-storage.service';
import { TodoOption } from '../../models/todo-option';
@Injectable({
  providedIn: 'root'
})
export class TodosService {


  todosStorage = inject(TodosStorageService);

  todos = signal<Todo[]>([]);
  selectedOption = signal<TodoOption>('همه');

  filteredTodos = computed(() => {
    switch (this.selectedOption()) {
      case 'همه':
        return this.todos();
      case 'فعال':
        return this.todos().filter((todo) => !todo.completed);
      case 'کامل شده':
        return this.todos().filter((todo) => todo.completed);
    }
  });
  todosLeft = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  getTodos(): Observable<Todo[]> {
    return this.todosStorage.getTodos().pipe(tap((res) => this.todos.set(res)));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.todosStorage
      .createTodo(todo)
      .pipe(
        tap((newTodo) => this.todos.update((todos) => [...todos, newTodo]))
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.todosStorage
      .updateTodo(todo)
      .pipe(
        tap((updatedTodo) =>
          this.todos.update((todos) =>
            todos.map((t) => (t.id === todo.id ? updatedTodo : t))
          )
        )
      );
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.todosStorage
      .deleteTodo(id)
      .pipe(
        tap(() =>
          this.todos.update((todos) => todos.filter((todo) => todo.id !== id))
        )
      );
  }

  clearCompletedTodo() {
    return from(this.todos().filter((todo) => todo.completed)).pipe(
      mergeMap((todo) => this.deleteTodo(todo.id!)),
      tap(() =>
        this.todos.update((todos) => todos.filter((todo) => !todo.completed))
      )
    );
  }

  selectTodoOption(todoOption: TodoOption) {
    if (this.selectedOption() === todoOption) return;

    this.selectedOption.set(todoOption);
  }
}
