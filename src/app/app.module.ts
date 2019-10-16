import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducers';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-table/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    UserTableComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
