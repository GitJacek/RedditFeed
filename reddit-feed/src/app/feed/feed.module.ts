import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryCardComponent } from './entry-card/entry-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { EntryDetailsDialogComponent } from './entry-details-dialog/entry-details-dialog.component';
import { EntryListHttpService } from './entry-list/entry-list-http.service';

@NgModule({
  declarations: [
    EntryListComponent,
    EntryCardComponent,
    EntryDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [
    EntryListHttpService
  ]
})
export class FeedModule { }
