import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { Router } from '@angular/router';
import { ImportDataService } from '../../services/import-data.service';
@Component({
  selector: 'app-import-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './import-page.component.html',
  styleUrl: './import-page.component.less',
})
export class ImportPageComponent {
  importCsvForm = new FormGroup({
    csvFile: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/\.csv$/),
    ]),
  });

  importCsvAllForm = new FormGroup({
    csvFile: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/\.csv$/),
    ]),
  });

  importNotesForm = new FormGroup({
    importFormat: new FormControl(''),
    notes: new FormControl(null, [Validators.required]),
  });

  private selectedFile: File | null = null;
  private selectedFileAll: File | null = null;
  private response: any;
  importAllError: string | null = null;
  importError: string | null = null;

  constructor(
    private importService: ImportService,
    private router: Router,
    private importDataService: ImportDataService
  ) {}

  ngOnInit() {
    // default is author-title option
    this.importNotesForm.controls.importFormat.setValue('authorTitle');
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Update form control value with file name for validation
      this.importCsvForm.patchValue({
        csvFile: this.selectedFile.name,
      });
    }
  }

  onAllFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileAll = input.files[0];
      // Update form control value with file name for validation
      this.importCsvAllForm.patchValue({
        csvFile: this.selectedFileAll.name,
      });
    }
  }

  onSubmitCsvAll() {
    if (this.importCsvAllForm.valid && this.selectedFileAll) {
      const formData = new FormData();
      formData.append('file', this.selectedFileAll);

      this.importService.importCsvAll(formData).subscribe({
        next: (response) => {
          console.log('Import all books successful:', response);
          this.response = response;
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.importAllError = 'An error occurred while importing all books. Please try again.';
        },
        complete: () => {
          // navigate back to the book details page
          // response is { ... import_books: [ ... ] }
          //const importBooks = this.response.import_books;
          console.log('Import books:', this.response);
          this.router.navigate(['/books']);
        },
      });
    }
  }

  onSubmitCsv() {
    if (this.importCsvForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.importService.importCsv(formData).subscribe({
        next: (response) => {
          console.log('Import step 1 successful:', response);
          this.response = response;
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.importError = 'An error occurred while importing all books. Please try again.';
        },
        complete: () => {
          // navigate back to the book details page
          // response is { ... import_books: [ ... ] }
          const importBooks = this.response.import_books;
          this.importDataService.setImportResults(importBooks);
          this.router.navigate(['/import/results']);
        },
      });
    }
  }

  onSubmitNotes() {
    if (this.importNotesForm.valid) {
      const formData = new FormData();
      const notes = this.importNotesForm.get('notes')?.value;
      const importFormat = this.importNotesForm.get('importFormat')?.value;
      console.log('Import format:', importFormat);
      console.log('Notes:', notes);
      if (notes) {
        formData.append('notes', notes);
      }
      if (importFormat) {
        formData.append('importFormat', importFormat);
      }
      // the code looks like it's exactly the same as the one in onSubmitCsv
      this.importService.importNotes(formData).subscribe({
        next: (response) => {
          console.log('Import step 1 successful:', response);
          this.response = response;
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          // navigate back to the book details page
          // response is { ... import_books: [ ... ] }
          const importBooks = this.response.import_books;
          this.importDataService.setImportResults(importBooks);
          this.router.navigate(['/import/results']);
        },
      });
    }
  }
}
