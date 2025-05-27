import { Component } from '@angular/core';
import { IconPickerComponent } from '../shared/components/icon-picker/icon-picker.component';

@Component({
  selector: 'app-test',
  imports: [
    IconPickerComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.less'
})
export class TestComponent {
  iconSelected($event: any) {
    alert('picked:'+$event)
  }

}
