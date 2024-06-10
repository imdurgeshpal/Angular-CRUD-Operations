import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModeEnum } from './models/mode.enum';
import { User } from './models/user';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let userServiceSpy = {
    getAllUsers: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should validate users`, () => {
    // given: mock the return of the moethod getAllUsers
    userServiceSpy.getAllUsers.mockReturnValue([
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
    ]);

    // when: triggers the component method that calls the service
    component.ngOnInit();

    // then: expect that any logic or treatment is done correctly
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.users.length).toEqual(2);
  });

  it('should set mode to ADD when addNewUser is called', () => {
    // given: component is initialized
    fixture.detectChanges();

    // when: addNewUser method is called
    component.addNewUser();

    // then: expect mode to be set to ADD
    expect(component.mode).toEqual(ModeEnum.ADD);
  });

  it('should set mode to EDIT and populate form with user data', () => {
    // given: a user object
    const user: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };

    // when: editUser method is called with the user object
    component.editUser(user);

    // then: expect mode to be set to EDIT
    expect(component.mode).toEqual(ModeEnum.EDIT);

    // and: expect form to be populated with user data
    expect(component.form.value).toEqual(user);
  });

  it('should save user', () => {
    // given: a valid user form
    const userForm = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };
    component.form.setValue(userForm);

    // when: saveUser method is called
    component.saveUser();

    // then: expect the user to be added or updated based on the mode
    if (component.mode === ModeEnum.ADD) {
      expect(userServiceSpy.addUser).toHaveBeenCalledWith(userForm);
    } else if (component.mode === ModeEnum.EDIT) {
      expect(userServiceSpy.updateUser).toHaveBeenCalledWith(userForm);
    }

    // and: expect the users to be updated
    expect(component.users).toEqual(userServiceSpy.getAllUsers());
  });

  it('should remove user', () => {
    // given: a user object
    const user: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };

    // when: removeUser method is called with the user object
    component.removeUser(user);

    // then: expect the user to be deleted
    expect(userServiceSpy.deleteUser).toHaveBeenCalledWith(user);

    // and: expect the users to be updated
    expect(component.users).toEqual(userServiceSpy.getAllUsers());
  });

  it('should reset form and set mode to NON when cancel is called', () => {
    // when: cancel method is called
    component.cancel();

    // then: expect form to be reset
    expect(component.form.value).toEqual({
      id: null,
      firstName: null,
      lastName: null,
    });

    // and: expect mode to be set to NON
    expect(component.mode).toEqual(ModeEnum.NON);
  });
});
