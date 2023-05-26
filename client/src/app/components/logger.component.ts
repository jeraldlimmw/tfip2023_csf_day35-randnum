import { Component, OnInit, inject } from '@angular/core';
import { RandomResponse } from '../models';
import { RandomService } from '../random-number.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit{

  randSvc = inject(RandomService)

  num$!: Observable<RandomResponse>

  ngOnInit(): void {
      // note the new num every time there is a request - displayed in html
      this.num$ = this.randSvc.onRequest 
  }
  
}
