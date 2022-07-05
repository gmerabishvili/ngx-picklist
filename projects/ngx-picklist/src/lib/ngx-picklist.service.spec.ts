import { TestBed } from '@angular/core/testing';

import { NgxPicklistService } from './ngx-picklist.service';

describe('NgxPicklistService', () => {
  let service: NgxPicklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPicklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
