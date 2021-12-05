import { TestBed } from '@angular/core/testing';

import { EntryListComponent } from './entry-list.component';
import { EntryListHttpService } from './entry-list-http.service';
import { RedditPage } from '../models/reddit-page';
import { Observable, from } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

class MockEntryListHttpService {
  getEntries(limit: number, showedEntries: number, beforeId?: string, afterId?: string): Observable<RedditPage> {
    return from([{
      after: 'afterId',
      before: 'beforeId',
      children: new Array(limit).fill(0).map((x, i) => {
        const itemNr = showedEntries + i;
        return {
          data: {
            id: `id${itemNr}`,
            thumbnail: `id${itemNr}`,
            created: new Date(),
            num_comments: x,
            author: `author${itemNr}`,
            score: x,
            title: `title${itemNr}`,
            selftext: `selftext${itemNr}`
          }
        };
      })
    }])
  }
}

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let entryListHttpService: EntryListHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        EntryListComponent,
        { provide: EntryListHttpService, useClass: MockEntryListHttpService },
        MatDialog
      ]
    });

    component = TestBed.inject(EntryListComponent);
    entryListHttpService = TestBed.inject(EntryListHttpService);
  });

  it('should load next entries', () => {
    component.loadNextEntries();

    expect(component.entries[0].id).toEqual('id25');
    expect(component.showedEntries).toEqual(25);
  });

  it('should load previous entries', () => {
    component.loadNextEntries();
    component.loadNextEntries();
    component.loadNextEntries();
    component.loadPreviousEntries();

    expect(component.entries[0].id).toEqual('id50');
    expect(component.showedEntries).toEqual(50);
  });
});
