import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule,
  MatListModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatListModule],
  exports: [BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatListModule]
})
export class MaterialModule { }

