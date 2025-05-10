import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-import-page',
  imports: [ReactiveFormsModule],
  templateUrl: './import-page.component.html',
  styleUrl: './import-page.component.less'
})
export class ImportPageComponent {

  importCsvForm = new FormGroup({
    csvFile: new FormControl('')
  });
  importNotesForm = new FormGroup({
    titleAuthor: new FormControl(''),
    authorTitle: new FormControl(''),
    notes: new FormControl('')
  });

  ngOnInit() {
    this.importNotesForm.controls.authorTitle.setValue("1");
  }

  onSubmitCsv() {
    throw new Error('Method not implemented.');
  }
  onSubmitNotes() {
    throw new Error('Method not implemented.');
  }
}