import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path : '', redirectTo : 'users', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
