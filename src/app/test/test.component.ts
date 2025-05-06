import { Component } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';

@Component({
  selector: 'app-test',
  imports: [BookItemComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.less'
})
export class TestComponent {

}
