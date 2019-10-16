import { Component, OnInit } from '@angular/core';
import { appState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from '../models/user.model';
import * as userActions from '../store/users.actions'
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users$:Observable<UserDetails[]>;
  userDetails:string;
  constructor(
    private store: Store<appState>,
  ){
    
  }
  ngOnInit() {
    this.users$ = this.store.select('users').pipe(map(state=>state.users))
  }
  deleteUser(user:UserDetails){
    if(confirm(`Are you sure you wish to remove ${user.name} ${user.surname}?`)){
      this.store.dispatch(new userActions.RemoveUser({id:user.id}))
    }
  }
  showUserDetails(user:UserDetails){

  }
}
