import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ContainerComponent } from './main/container/container.component';
import { ChatComponent } from './main/container/chat/chat.component';
import { DriveComponent } from './main/container/drive/drive.component';
import { TodoListComponent} from './main/todo/todo-list.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './main/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './shared/service/login.service';
import { TodoEditComponent } from './main/todo/todo-edit/todo-edit.component';
import { TodoListService } from './shared/service/todo-list-service';
import { AuthGuard } from './shared/service/auth-guard.service';
import { GroupsComponent } from './main/groups/groups.component';
import {UsersService} from './shared/service/users.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ContainerComponent,
    ChatComponent,
    DriveComponent,
    TodoListComponent,
    TodoEditComponent,
    ContactsComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, LoginService, TodoListService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
