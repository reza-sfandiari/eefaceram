import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersStorageService } from './users-storage.service';
import { NewUser } from '../../models/user';
import { UserOption } from '../../models/user-option';
import { from, merge, mergeMap, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersStorage = inject(UsersStorageService);

  users = signal<NewUser[]>([]);
  selectedOption = signal<UserOption>('همه');
  filteredUsers = computed(() => {
    switch (this.selectedOption()) {
      case 'همه':
        return this.users();
      case 'فعال':
        return this.users().filter((user) => user.status);
      case 'غیر فعال':
        return this.users().filter((user) => !user.status);
    }
  });

  usresLeft = computed(
    () => this.users().filter((user) => user.status).length
  );

  getUsers(): Observable<NewUser[]> {
    return this.usersStorage.getUsers().pipe(tap((res) => this.users.set(res)));
  }
  createUser(user: NewUser): Observable<NewUser> {
    return this.usersStorage
      .createUser(user)
      .pipe(
        tap((newUser) => this.users.update((users) => [...users, newUser]))
      );
  }

  updateUser(user: NewUser): Observable<NewUser> {
    return this.usersStorage
      .updateUser(user)
      .pipe(
        tap((updatedUser) =>
          this.users.update((users) =>
            users.map((u) => (u.id === user.id ? updatedUser : u))
          )
        )
      );
  }

  deleteUser(id: number): Observable<NewUser> {
    return this.usersStorage
      .deleteUser(id)
      .pipe(
        tap((deletedUser) =>
          this.users.update((users) => users.filter((u) => u.id !== id))
        )
      );
  }
  clearCompletedUser() {
    return from(this.users().filter((user) => user.status)).pipe(
      mergeMap((user) => this.deleteUser(user.id!)),
      tap(() =>
        this.users.update((users) => users.filter((user) => !user.status))
      )
    );
  }

  selectUserOption(userOption: UserOption) {
    if ( this.selectedOption() === userOption) {
      return;
    }
    this.selectedOption.set(userOption);
  }
}
