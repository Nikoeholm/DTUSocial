import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './main/login/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'groups', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {

}
