import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ImportService } from '../import.service';
import { Router } from '@angular/router';
import { ImportDataService } from '../import-data.service';
@Component({
  selector: 'app-import-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './import-page.component.html',
  styleUrl: './import-page.component.less'
})
export class ImportPageComponent {

  importCsvForm = new FormGroup({
    csvFile: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/\.csv$/)]),
  });

  importNotesForm = new FormGroup({
    titleAuthor: new FormControl(''),
    authorTitle: new FormControl(''),
    notes: new FormControl(null, [Validators.required]),
  });

  private selectedFile: File | null = null;
  private response: any;

  constructor(private importCsvService: ImportService,
    private router: Router,
    private importDataService: ImportDataService
  ) {}

  ngOnInit() {
    // default is author-title option
    this.importNotesForm.controls.authorTitle.setValue("1");
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Update form control value with file name for validation
      this.importCsvForm.patchValue({
        csvFile: this.selectedFile.name
      });
    }
  }



  onSubmitCsv() {
    if (this.importCsvForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.importCsvService.importCsv(formData).subscribe(
        {
        next: response => {
          console.log('Import step 1 successful:', response);
          this.response = response;
        },
        error: error => {
          console.error('Error occurred:', error);
        },
        complete: () => {
            // navigate back to the book details page
            // response is { ... import_books: [ ... ] }
            const importBooks = this.response.import_books;
            this.importDataService.setImportResults(importBooks);
            this.router.navigate(['/import_results']);
        }
      }
      );
    }
  }
  onSubmitNotes() {
    throw new Error('Method not implemented.');
  }
}