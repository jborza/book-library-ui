import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAutocompleteComponent } from './author-autocomplete.component';

describe('AuthorAutocompleteComponent', () => {
  let component: AuthorAutocompleteComponent;
  let fixture: ComponentFixture<AuthorAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
