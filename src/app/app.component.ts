import { Component, OnInit } from '@angular/core';
import { SseService } from 'src/app/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-sse';
  _responseData: any;

  constructor(private sseService: SseService) {}

  ngOnInit() {
    this.sseService
      .getServerSentEvent('http://localhost:5000/events')
      .subscribe((data) => {
        this._responseData = data.data;
        console.log(data);
      });
  }
}
