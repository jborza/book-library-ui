import { Component } from '@angular/core';
import { ColumnVisibilityService } from '../../services/column-visibility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'column-selector-component',
  imports: [CommonModule],
  templateUrl: './column-selector.component.html',
  styleUrl: './column-selector.component.less',
})
export class ColumnSelectorComponent {
  columns$: typeof this.columnVisibilityService.columns$;
  constructor(private columnVisibilityService: ColumnVisibilityService) {
    this.columns$ = this.columnVisibilityService.columns$;
  }

  toggleColumnVisibility(columnValue: string) {
    this.columnVisibilityService.toggleColumnVisibility(columnValue);
  }
}
