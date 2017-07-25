import { Injectable } from '@angular/core';
import  {User} from './user';
import {USER_PERSONS} from './user-data';


@Injectable()
export class UserService {
  private upersons=USER_PERSONS;

  getUsersFromData():User[]{
    console.log(this.upersons);
    return this.upersons;
  }

  constructor() { }

}
