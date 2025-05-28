import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-multiple-match-options',
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-match-options.component.html',
  styleUrl: './multiple-match-options.component.less'
})
export class MultipleMatchOptionsComponent {
  provider = 'Google Books'; // Default value for provider
  updateCover = true; // Default value for "Update Cover"
  updateMetadata = true; // Default value for "Update Metadata"

  @Output() submit = new EventEmitter<{ provider: string; updateCover: boolean; updateMetadata: boolean }>();
  @Output() cancel = new EventEmitter<void>();

  hideModal(): void {
    const modalElement = document.getElementById('matchBooksModal');
    if (modalElement) {
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal?.hide();
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('multipleMatchOptionsModal');
    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }

  onSubmit(): void {
    // Emit the submit event with the selected options
    this.submit.emit({
      provider: this.provider,
      updateCover: this.updateCover,
      updateMetadata: this.updateMetadata,
    });
    this.hideModal();
  }

  onCancel(): void {
    // Emit the cancel event
    this.cancel.emit();
    this.hideModal();
  }
}
