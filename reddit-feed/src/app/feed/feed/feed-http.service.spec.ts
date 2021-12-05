import { TestBed } from '@angular/core/testing';

import { FeedHttpService } from './feed-http.service';

describe('FeedHttpService', () => {
  let service: FeedHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
