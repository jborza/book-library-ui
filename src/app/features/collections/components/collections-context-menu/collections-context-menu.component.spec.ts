import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsContextMenuComponent } from './collections-context-menu.component';

describe('CollectionsContextMenuComponent', () => {
  let component: CollectionsContextMenuComponent;
  let fixture: ComponentFixture<CollectionsContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsContextMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
