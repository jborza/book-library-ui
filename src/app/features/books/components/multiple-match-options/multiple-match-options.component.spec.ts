import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleMatchOptionsComponent } from './multiple-match-options.component';

describe('MultipleMatchOptionsComponent', () => {
  let component: MultipleMatchOptionsComponent;
  let fixture: ComponentFixture<MultipleMatchOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleMatchOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleMatchOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
