import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchesComponent } from './custom-searches.component';

describe('CustomSearchesComponent', () => {
  let component: CustomSearchesComponent;
  let fixture: ComponentFixture<CustomSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSearchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
