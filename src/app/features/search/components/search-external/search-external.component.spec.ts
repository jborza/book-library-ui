import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExternalComponent } from './search-external.component';

describe('SearchExternalComponent', () => {
  let component: SearchExternalComponent;
  let fixture: ComponentFixture<SearchExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchExternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
