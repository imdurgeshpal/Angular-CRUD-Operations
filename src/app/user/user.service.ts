import { Injectable } from '@angular/core';
import  {User} from './user';
import {USER_PERSONS} from './user-data';
import { findIndex } from 'lodash';
@Injectable()
export class UserService {
  private upersons=USER_PERSONS;

  getUsersFromData():User[]{
    console.log(this.upersons);
    return this.upersons;
  }

  addUser(user:User){
    this.upersons.push(user);
    console.log(this.upersons);

  }
  updateUser(user:User){
    let index=findIndex(this.upersons,(u:User)=>{
      return u.id=== user.id;
    })
    this.upersons[index]=user;
  }
  deleteUser(user:User){
    this.upersons.splice(this.upersons.indexOf(user),1);
    console.log(this.upersons);
  }

  constructor() { }

}
