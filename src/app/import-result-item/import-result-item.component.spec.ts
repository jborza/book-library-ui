import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportResultItemComponent } from './import-result-item.component';

describe('ImportResultItemComponent', () => {
  let component: ImportResultItemComponent;
  let fixture: ComponentFixture<ImportResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportResultItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
