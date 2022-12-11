import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSpaceDialogComponent } from './room-space-dialog.component';

describe('RoomSpaceDialogComponent', () => {
  let component: RoomSpaceDialogComponent;
  let fixture: ComponentFixture<RoomSpaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomSpaceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
