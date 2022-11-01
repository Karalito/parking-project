import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSpacesCountComponent } from './free-spaces-count.component';

describe('FreeSpacesCountComponent', () => {
  let component: FreeSpacesCountComponent;
  let fixture: ComponentFixture<FreeSpacesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeSpacesCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeSpacesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
