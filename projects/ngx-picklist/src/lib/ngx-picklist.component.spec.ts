import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPicklistComponent } from './ngx-picklist.component';

describe('NgxPicklistComponent', () => {
  let component: NgxPicklistComponent;
  let fixture: ComponentFixture<NgxPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPicklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
