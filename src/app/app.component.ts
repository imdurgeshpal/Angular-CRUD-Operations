import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "./models/user";
import { UserService } from "./services/user.service";
import { ModeEnum } from "./enum/mode.enum";
import { MatTable } from "@angular/material/table";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  form = this.fb.group({
    id: [],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
  });

  ModeEnum = ModeEnum;
  displayedColumns: string[] = ["id", "firstName", "lastName", "action"];

  users: User[];
  mode = ModeEnum.NON;
  @ViewChild(MatTable) table: MatTable<User>;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngAfterViewInit() {
    this.setUsers();
  }

  private setUsers() {
    this.users = this.userService.getAllUsers();
    this.table.renderRows();
  }

  editUser(user?: User) {
    if (user) {
      this.form.setValue(user);
      this.mode = ModeEnum.EDIT;
    } else {
      this.mode = ModeEnum.ADD;
    }
  }

  saveUser() {
    const user = this.form.value as User;

    if (this.mode === ModeEnum.ADD) {
      this.userService.addUser(user);
    } else {
      this.userService.updateUser(user);
    }
    this.form.reset();
    this.setUsers();
    this.mode = ModeEnum.NON;
    this.cancel();
  }

  removeUser(user: User) {
    this.userService.deleteUser(user);
    this.setUsers();
  }

  cancel() {
    this.mode = ModeEnum.NON;
  }
}
