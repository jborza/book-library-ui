import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module'; // Import CoreModule
// import { AppRoutingModule } from './app-routing.module'; // Optional for routing

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule, // Required for browser apps
    CoreModule,    // Import CoreModule for singleton services
    // AppRoutingModule, // Optional, if you have routing
  ],
  bootstrap: [], 
})
export class AppModule {}