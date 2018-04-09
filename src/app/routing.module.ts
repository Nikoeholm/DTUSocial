import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanDeactivate} from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './shared/service/auth-guard.service';
import {TodoListComponent} from './main/todo/todo-list.component';
import {ChatComponent} from './main/container/chat/chat.component';
import {ChatWindowComponent} from './main/container/chat/specific-chat/chat-window/chat-window.component';
import { ContainerComponent } from './main/container/container.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'container', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'todo', component: TodoListComponent},
    { path: 'container', component: ContainerComponent, canActivate: [AuthGuard], children: [
      { path: 'group/:id', component: ChatWindowComponent },
      { path: 'personal/:id', component: ChatWindowComponent }]},
    { path: 'groups', component: MainComponent},
    { path: 'profile', component: ProfileComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {

}
