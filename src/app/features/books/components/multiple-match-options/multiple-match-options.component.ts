import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchProvidersService } from '../../services/match-providers.service';

declare var bootstrap: any;

@Component({
  selector: 'app-multiple-match-options',
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-match-options.component.html',
  styleUrl: './multiple-match-options.component.less'
})
export class MultipleMatchOptionsComponent {
  provider = '';
  updateCover = true;
  updateMetadata = true;

  @Output() submit = new EventEmitter<{ provider: string; updateCover: boolean; updateMetadata: boolean }>();
  @Output() cancel = new EventEmitter<void>();
  providers: { label: string; value: string; }[] = [];

  constructor(private matchProvidersService: MatchProvidersService) { }

  ngOnInit(): void {
    this.providers = this.matchProvidersService.getProviders();
    this.provider = MatchProvidersService.DEFAULT_PROVIDER;
  }

  hideModal(): void {
    const modalElement = document.getElementById('matchBooksModal');
    if (modalElement) {
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal?.hide();
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('matchBooksModal');
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
