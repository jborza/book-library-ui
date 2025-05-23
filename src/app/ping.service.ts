import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  // TODO figure out a way to notify the GUI when the backend is down
  // make a singleton service?
  private subscription: Subscription;
  @Output() pingCalled = new EventEmitter<any>();
  private lastStatus: boolean = false;


  constructor(private http: HttpClient, private apiService: ApiService) {
    this.subscription = interval(5000) // 30 seconds
      .subscribe(() => {
        this.pollBackend();
      });
  }

  callPing(): Observable<any> {
    return this.http.get(this.apiService.getPingUrl());
  }

  private pollBackend() {
    this.callPing().subscribe({
      next: (response) => {
        this.lastStatus = true;
        this.pingCalled.emit(this.lastStatus);
      },
      error: (error) => {
        this.lastStatus = false;
        this.pingCalled.emit(this.lastStatus);
      },
      complete: () => {},
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
