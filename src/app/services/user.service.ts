import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly users: User[] = [
    {
      id: 1,
      firstName: 'Durgesh',
      lastName: 'Pal',
    },
    {
      id: 2,
      firstName: 'Ankur',
      lastName: 'Pal',
    },
  ];

  /**
   * @deprecated api methods for testing only
   */
  getApiUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  /**
   * @deprecated api methods for testing only
   */
  addApiUser(user: User): Observable<User> {
    return this.http.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      user
    );
  }

  getAllUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex((u) => user.id === u.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(user: User): void {
    const index = this.users.findIndex((u) => user.id === u.id || user === u);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
