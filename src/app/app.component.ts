import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { PingService } from './ping.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'book-library-ui';
  constructor(private pingService: PingService) {
    pingService.pingCalled.subscribe((response) => {
      console.log('AppComponent Ping response:', response);
    });
  }
}