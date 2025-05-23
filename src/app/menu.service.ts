import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }

  private isMenuVisible = new BehaviorSubject<boolean>(true);
  menuVisibility$ = this.isMenuVisible.asObservable();

  toggleMenu() {
    this.isMenuVisible.next(!this.isMenuVisible.value);
  }

  hideMenu() {
    this.isMenuVisible.next(false);
  }

  showMenu() {
    this.isMenuVisible.next(true);
  }

}
