import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService } from './menu.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CoreModule } from './core/core.module';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'book-library-ui';

  constructor(private menuService: MenuService,
    private router: Router, 
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof Scroll || event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof Scroll) {
          // Check if the current route is BookListComponent
          if (event.routerEvent.url.includes('/books')) {
            // Do nothing to disable scrolling
            return;
          }

          // Default scroll behavior for other pages
          if (event.position) {
            // Scroll to the previous position
            this.viewportScroller.scrollToPosition(event.position);
          } else {
            // Scroll to the top for new navigation
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        }
      });
    }

  get menuClass(){
    return this.menuService.isMenuOpen ? 'col-md-3' : 'col-auto';
  }

  get mainClass() {
    return this.menuService.isMenuOpen ? 'col-md-9 ml-sm-auto col-lg-9' : 'col';
  }
}