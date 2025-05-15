import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToNumberPipe } from '../pipe/to-number.pipe';
import { TruncatePipe } from '../pipe/truncate.pipe'; // Import the TruncatePipe

@Component({
  selector: 'app-import-result-item',
  imports: [CommonModule,
    ToNumberPipe,
    TruncatePipe],
  templateUrl: './import-result-item.component.html',
  styleUrl: './import-result-item.component.less'
})
export class ImportResultItemComponent {
  @Input() book: any; // Input to receive the result data
  @Output() actionChange = new EventEmitter<string>(); // Output to notify parent of action change

  selectedAction: string = 'merge'; // Default action



  // Emit the selected action whenever it changes
  onActionChange(action: string): void {
    this.selectedAction = action;
    this.actionChange.emit(action);
  }
}
