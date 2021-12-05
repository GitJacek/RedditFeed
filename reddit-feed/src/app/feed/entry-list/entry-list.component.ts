import { Component, OnInit } from '@angular/core';
import { EntryListHttpService } from './entry-list-http.service';
import { Entry } from '../models/entry';
import { MatDialog } from '@angular/material/dialog';
import { EntryDetailsDialogComponent } from '../entry-details-dialog/entry-details-dialog.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { RedditPage } from '../models/reddit-page';
import { RedditResponse } from '../models/reddit-response';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  redditPageAfterId?: string;
  redditPageBeforeId?: string;
  previousRedditPageAfterId?: string;
  previousRedditPageBeforeId?: string;

  entries: Entry[] = [];
  limit: number = 25;
  showedEntries: number = 0;
  constructor(public entryDetailsDialog: MatDialog, private httpService: EntryListHttpService) { }

  ngOnInit(): void {
    this.getEntries(this.limit, this.showedEntries);
  }

  getEntries(limit: number, showedEntries: number, beforeId?: string, afterId?: string): void {
    this.httpService.getEntries(limit, showedEntries, beforeId, afterId).subscribe(
      (redditPage: RedditPage) => {
        this.previousRedditPageAfterId = afterId;
        this.previousRedditPageBeforeId = beforeId;
        this.redditPageAfterId = redditPage.after;
        this.redditPageBeforeId = redditPage.before;
        this.entries = redditPage.children.map((response: RedditResponse<Entry>) => response.data)
          .map(this.mapEntryDate);
      }
    )
  }

  onEntryCardClick(entry: Entry): void {
    this.openDialog(entry);
  }

  openDialog(entry: Entry): void {
    this.entryDetailsDialog.open(EntryDetailsDialogComponent, {
      width: '70%',
      data: entry
    });
  }

  onLimitChange(limitChange: MatButtonToggleChange): void {
    this.limit = limitChange.value;
    this.getEntries(this.limit, this.showedEntries, undefined, this.previousRedditPageAfterId);
  }

  loadPreviousEntries(): void {
    this.showedEntries -= Number(this.limit);
    this.showedEntries = Math.max(0, this.showedEntries);
    this.getEntries(this.limit, this.showedEntries, this.redditPageBeforeId);
  }

  loadNextEntries(): void {
    this.showedEntries += Number(this.limit);
    this.getEntries(this.limit, this.showedEntries, undefined, this.redditPageAfterId);
  }

  isPreviousPageDisabled(): boolean {
    return this.previousRedditPageBeforeId == this.redditPageBeforeId && this.redditPageBeforeId == null;
  }

  private mapEntryDate(entry: Entry): Entry {
    return { ...entry, created: new Date(1000 * Number(entry.created)) };
  }
}
