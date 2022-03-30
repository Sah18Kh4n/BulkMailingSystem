import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMailingSystemComponent } from './bulk-mailing-system.component';

describe('BulkMailingSystemComponent', () => {
  let component: BulkMailingSystemComponent;
  let fixture: ComponentFixture<BulkMailingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkMailingSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMailingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
