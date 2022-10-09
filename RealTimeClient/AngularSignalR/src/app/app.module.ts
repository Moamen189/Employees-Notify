// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserModule } from '@angular/platform-browser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NgModule } from '@angular/core';
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppRoutingModule } from './app-routing.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpClientModule } from '@angular/common/http';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppComponent } from './app.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ModalComponent } from './modal/modal.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavMenuComponent } from './nav-menu/nav-menu.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    ModalComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AppModule { }
