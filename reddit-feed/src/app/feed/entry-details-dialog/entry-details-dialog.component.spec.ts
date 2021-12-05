import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDetailsDialogComponent } from './entry-details-dialog.component';

describe('EntryDetailsDialogComponent', () => {
  let component: EntryDetailsDialogComponent;
  let fixture: ComponentFixture<EntryDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
