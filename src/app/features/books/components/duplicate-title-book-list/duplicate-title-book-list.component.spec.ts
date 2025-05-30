import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateTitleBookListComponent } from './duplicate-title-book-list.component';

describe('DuplicateTitleBookListComponent', () => {
  let component: DuplicateTitleBookListComponent;
  let fixture: ComponentFixture<DuplicateTitleBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicateTitleBookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateTitleBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
