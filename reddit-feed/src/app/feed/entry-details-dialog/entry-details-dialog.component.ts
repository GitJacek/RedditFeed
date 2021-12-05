import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry } from '../models/entry';

@Component({
  selector: 'app-entry-details-dialog',
  templateUrl: './entry-details-dialog.component.html',
  styleUrls: ['./entry-details-dialog.component.scss']
})
export class EntryDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public entry: Entry) {console.log(entry)}

}
