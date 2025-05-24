import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from './menu.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'book-library-ui';

  constructor(private menuService: MenuService) {}

  get menuClass(){
    return this.menuService.isMenuOpen ? 'col-md-3' : 'col-auto';
  }

  get mainClass() {
    return this.menuService.isMenuOpen ? 'col-md-9 ml-sm-auto col-lg-9' : 'col';
  }
}