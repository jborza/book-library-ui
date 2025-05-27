import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultItemComponent } from './match-result-item.component';

describe('MatchResultItemComponent', () => {
  let component: MatchResultItemComponent;
  let fixture: ComponentFixture<MatchResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchResultItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
