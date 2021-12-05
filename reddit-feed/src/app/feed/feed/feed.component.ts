import { Component, OnInit } from '@angular/core';
import { FeedHttpService } from './feed-http.service';
import { Subscription } from 'rxjs';
import { Entry } from '../models/entry';
import { MatDialog } from '@angular/material/dialog';
import { EntryDetailsDialogComponent } from '../entry-details-dialog/entry-details-dialog.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { RedditPage } from '../models/reddit-page';
import { RedditResponse } from '../models/reddit-response';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  redditPageAfterId?: string;
  redditPageBeforeId?: string;
  previousRedditPageAfterId?: string;
  previousRedditPageBeforeId?: string;

  entries: Entry[] = [];
  limit: number = 25;
  showedEntries: number = 0;
  constructor(public entryDetailsDialog: MatDialog, private httpService: FeedHttpService) { }

  ngOnInit(): void {
    this.getEntries(this.limit, this.showedEntries);
  }

  getEntries(limit: number, showedEntries: number, beforeId?: string, afterId?: string) {
    return this.httpService.getEntries(limit, showedEntries, beforeId, afterId).subscribe(
      (redditPage: RedditPage) => {
        this.previousRedditPageAfterId = afterId;
        this.previousRedditPageBeforeId = beforeId;
        this.redditPageAfterId = redditPage.after;
        this.redditPageBeforeId = redditPage.before;
        this.entries = redditPage.children.map((response: RedditResponse<Entry>) => response.data)
          .map((entry: Entry) => { return { ...entry, created: new Date(1000 * Number(entry.created)) } });
      }
    )
  }

  onEntryCardClick(entry: Entry) {
    this.openDialog(entry);
  }

  openDialog(entry: Entry) {
    this.entryDetailsDialog.open(EntryDetailsDialogComponent, {
      width: '70%',
      data: entry
    });
  }

  onLimitChange(limitChange: MatButtonToggleChange) {
    this.limit = limitChange.value;
    this.getEntries(this.limit, this.showedEntries, undefined, this.previousRedditPageAfterId);
  }

  loadPreviousEntries() {
    this.showedEntries -= Number(this.limit);
    this.showedEntries = Math.max(0, this.showedEntries);
    this.getEntries(this.limit, this.showedEntries,  this.redditPageBeforeId);
  }

  loadNextEntries() {
    this.showedEntries += Number(this.limit);
    this.getEntries(this.limit, this.showedEntries,  undefined, this.redditPageAfterId);
  }

  isPreviousPageDisabled() {
    return this.previousRedditPageBeforeId == this.redditPageBeforeId && this.redditPageBeforeId == null
  }
}
