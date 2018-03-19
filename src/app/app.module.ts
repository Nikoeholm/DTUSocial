import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ContainerComponent } from './main/container/container.component';
import { ChatComponent } from './main/container/chat/chat.component';
import { DriveComponent } from './main/container/drive/drive.component';
import { TodoComponent } from './main/todo/todo.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ContainerComponent,
    ChatComponent,
    DriveComponent,
    TodoComponent,
    ContactsComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
