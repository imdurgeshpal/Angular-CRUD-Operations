
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './models/user';
import { ModeEnum } from './models/mode.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  ModeEnum = ModeEnum;
  users!: User[];
  mode = ModeEnum.NON;

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers() {
    this.users = this.userService.getAllUsers();
  }

  addNewUser() {
    this.mode = ModeEnum.ADD;
  }

  editUser(user: User) {
    this.mode = ModeEnum.EDIT;
    this.form.setValue(user);
  }

  saveUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const user = this.form.value as User;

    if (this.mode === ModeEnum.ADD) {
      this.userService.addUser(user);
    } else {
      this.userService.updateUser(user);
    }
    this.setUsers();
    this.cancel();

  }


  removeUser(user: User) {
    this.userService.deleteUser(user);
    this.setUsers();
  }

  cancel() {
    this.form.reset();
    this.mode = ModeEnum.NON;
  }
}
