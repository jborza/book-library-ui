import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMultipleEditorComponent } from './book-multiple-editor.component';

describe('BookMultipleEditorComponent', () => {
  let component: BookMultipleEditorComponent;
  let fixture: ComponentFixture<BookMultipleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMultipleEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMultipleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
