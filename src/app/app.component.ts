import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserService } from './services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './models/user';
import { ModeEnum } from './models/mode.enum';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  readonly ModeEnum = ModeEnum;

  // Modern Angular Signals for reactive state
  readonly users = signal<User[]>([]);
  readonly mode = signal<ModeEnum>(ModeEnum.NON);
  readonly isFormVisible = computed(() => this.mode() !== ModeEnum.NON);

  readonly form = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers(): void {
    this.users.set(this.userService.getAllUsers());
  }

  addNewUser(): void {
    this.mode.set(ModeEnum.ADD);
  }

  editUser(user: User): void {
    this.mode.set(ModeEnum.EDIT);
    this.form.setValue(user);
  }

  saveUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const user = this.form.value as User;

    if (this.mode() === ModeEnum.ADD) {
      this.userService.addUser(user);
    } else {
      this.userService.updateUser(user);
    }
    this.setUsers();
    this.cancel();
  }

  removeUser(user: User): void {
    this.userService.deleteUser(user);
    this.setUsers();
  }

  cancel(): void {
    this.form.reset();
    this.mode.set(ModeEnum.NON);
  }
}
