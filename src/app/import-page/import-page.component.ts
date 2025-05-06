import { Component } from '@angular/core';

@Component({
  selector: 'app-import-page',
  imports: [],
  templateUrl: './import-page.component.html',
  styleUrl: './import-page.component.less'
})
export class ImportPageComponent {
  uploadFile(event: any): void {
    // TODO: Handle file import and submit data to your API
  }
}