import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewUser, User } from '../../models/user';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersStorageService {
  http = inject(HttpClient);

  private starterDataUserSource = '../../assets/data/user.json';
  private dataUserKey = 'users';

  get usersSource() {
    const users = localStorage.getItem(this.dataUserKey);

    return users !== null
      ? of(JSON.parse(users) as NewUser[])
      : this.http.get<NewUser[]>(this.starterDataUserSource);
  }

  getUsers():Observable<NewUser[]> {
    return this.usersSource.pipe(
      tap((users) => localStorage.setItem(this.dataUserKey, JSON.stringify(users)))
    );
  }
  createUser(user: NewUser): Observable<NewUser> {
    return this.usersSource.pipe(
      map((users) => {
        const newUser: NewUser = {
          ...user,
          id: users.length ? users[users.length - 1].id! + 1 : 1,
        };
        localStorage.setItem(this.dataUserKey, JSON.stringify([...users, newUser]));
        return newUser;
      })
    );
  }
  updateUser(user: NewUser): Observable<NewUser> {
    return this.usersSource.pipe(
      map((users) => {
        console.log('user: ', user);
        localStorage.setItem(
          this.dataUserKey,
          JSON.stringify(users.map((u) => (u.id === user.id ? user : u)))
        );
        return user;
      }));
    }
  deleteUser(id: number): Observable<NewUser> {
    return this.usersSource.pipe(
      map((users) => {
        const deleted: NewUser = users[id - 1];
        localStorage.setItem(
          this.dataUserKey,
          JSON.stringify(users.filter((u) => u.id !== id))
        );
        return deleted;
      })
    );
  }
  

  constructor() {}
}
