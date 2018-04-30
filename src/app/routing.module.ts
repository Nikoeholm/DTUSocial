import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanDeactivate} from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './shared/service/auth-guard.service';
import {TodoListComponent} from './main/todo/todo-list.component';
import {ChatComponent} from './main/container/chat/chat.component';
import { ContainerComponent } from './main/container/container.component';
import {GroupsComponent} from './main/groups/groups.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'todo', component: TodoListComponent, canActivate: [AuthGuard]},
    { path: 'home', component: ContainerComponent,
      canActivateChild: [AuthGuard], children: [
        { path: 'group/:id', component: ChatComponent},
        { path: 'personal/:id', component: ChatComponent }
      ]
    },
    { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {

}
