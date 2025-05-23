import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PingService } from '../ping.service';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.less'
})
export class TopBarComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchCalled = new EventEmitter<void>();
  pingStatus: boolean = false;

  constructor(private pingService: PingService) {
    pingService.pingCalled.subscribe((response) => {
      this.pingStatus = response;
    });
  }

  onSearch() {
    console.log('Search triggered with:', this.searchText);
    this.searchCalled.emit(); // Emit search event
  }

  showHideMenu(): void {
  }

  onInputChange(value: any /* string*/) {
    this.searchText = value.data;
    this.searchTextChange.emit(this.searchText); // Emit text on every change
  }

  pingResponse() {
    return this.pingStatus ? "✅" : "❌";
  }

  get pingTooltipText(){
    return this.pingStatus ? "Backend is up" : "Backend is down";
  }
}
