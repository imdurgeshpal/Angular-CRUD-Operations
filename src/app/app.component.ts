
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
  protected form = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  protected ModeEnum = ModeEnum;
  protected users!: User[];
  protected mode = ModeEnum.NON;

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers() {
    this.users = this.userService.getAllUsers();
  }

  protected addNewUser() {
    this.mode = ModeEnum.ADD;
  }

  protected editUser(user: User) {
    this.mode = ModeEnum.EDIT;
    this.form.setValue(user);
  }

  protected saveUser() {
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


  protected removeUser(user: User) {
    this.userService.deleteUser(user);
    this.setUsers();
  }

  protected cancel() {
    this.form.reset();
    this.mode = ModeEnum.NON;
  }
}
