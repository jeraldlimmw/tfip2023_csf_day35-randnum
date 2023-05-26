import { Component, OnInit, inject } from '@angular/core';
import { RandomService } from './random-number.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RandomData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  randSvc = inject(RandomService)
  fb = inject(FormBuilder)
  
  num$!: Observable<number[]>
  form!: FormGroup

  ngOnInit(): void {
      this.form = this.createForm()
  }

  // both POST methods receive a RandomData object containing min, max and count
  postWithJson() {
    const data: RandomData = this.form.value
    console.info(">>> from JSON: ", data)
    this.num$ = this.randSvc.postRandomNumbersAsJson(data)
  }

  postWithForm() {
    const data: RandomData = this.form.value
    console.info(">>> from Form: ", data)
    this.num$ = this.randSvc.postRandomNumbersAsForm(data)
  }

  getRandomNumbers() {
    this.num$ = this.randSvc.getRandomNumbers(10)
  }

  createForm() {
    return this.fb.group({
      min: this.fb.control(0, [Validators.required, Validators.min(-100), Validators.max(100)]),
      max: this.fb.control(0, [Validators.required, Validators.min(-100), Validators.max(100)]),
      count: this.fb.control(5, [Validators.required, Validators.min(1), Validators.max(100)])
    })
  }

}
