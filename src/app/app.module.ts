import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SseService } from './sse.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [SseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
