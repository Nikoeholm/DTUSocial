import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule,
        MatListModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule],
  exports: [BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule]
})
export class MaterialModule { }

