import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user';
import { of } from 'rxjs';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy = { get: jest.fn(), post: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users', () => {
    const users: User[] = service.getAllUsers();
    expect(users.length).toBe(2);
    expect(users[0].id).toBe(1);
    expect(users[0].firstName).toBe('Durgesh');
    expect(users[0].lastName).toBe('Pal');
    expect(users[1].id).toBe(2);
    expect(users[1].firstName).toBe('Ankur');
    expect(users[1].lastName).toBe('Pal');
  });

  it('should add a new user', () => {
    const user: User = {
      id: 3,
      firstName: 'John',
      lastName: 'Doe',
    };
    service.addUser(user);
    const users: User[] = service.getAllUsers();
    expect(users.length).toBe(3);
    expect(users[2]).toEqual(user);
  });

  it('should update an existing user', () => {
    const user: User = {
      id: 1,
      firstName: 'Updated',
      lastName: 'User',
    };
    service.updateUser(user);
    const users: User[] = service.getAllUsers();
    expect(users[0]).toEqual(user);
  });

  it('should delete an existing user', () => {
    const user: User = {
      id: 2,
      firstName: 'Ankur',
      lastName: 'Pal',
    };
    service.deleteUser(user);
    const users: User[] = service.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0].id).toBe(1);
    expect(users[0].firstName).toBe('Durgesh');
    expect(users[0].lastName).toBe('Pal');
  });

  it('should return API users', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
      },
    ];

    httpClientSpy.get.mockReturnValue(of(mockUsers));

    service.getApiUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    );
  });

  it('should add a new user via API', () => {
    const user: User = {
      id: 3,
      firstName: 'John',
      lastName: 'Doe',
    };

    httpClientSpy.post.mockReturnValue(of(user));

    service.addApiUser(user).subscribe((addedUser) => {
      expect(addedUser).toEqual(user);
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      user
    );
  });
});
