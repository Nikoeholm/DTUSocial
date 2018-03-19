import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'chat', component: MainComponent },
    { path: 'groups', component: MainComponent },
    { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {

}
