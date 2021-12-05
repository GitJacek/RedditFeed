import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Entry } from '../models/entry';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss']
})
export class EntryCardComponent {
  @Input() entry: Entry;
  @Output() cardClick = new EventEmitter<Entry>();

  constructor() { }

  onCardClick(): void {
    this.cardClick.emit(this.entry);
  }

  isThumnailUrlValid(): boolean {
    return this.entry.thumbnail !== 'self' && this.entry.thumbnail !== 'default'
  }
}
