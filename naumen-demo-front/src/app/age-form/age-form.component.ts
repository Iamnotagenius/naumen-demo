import { Component, EventEmitter, Output } from '@angular/core';
import { AgeModel } from '../ageModel';
import { BackBindingService } from '../back-binding.service';
import { catchError, of, timeout } from 'rxjs';

@Component({
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.css']
})
export class AgeFormComponent {

  constructor (private backBinding: BackBindingService) {}

  @Output() nameRequested = new EventEmitter<AgeModel>();

  model?: AgeModel
  input = ""
  error?: string
  awaiting = false
  onSubmit() {
    if (this.input.length == 0) {
      this.error = "Name required"
      return
    }
    this.awaiting = true
    this.backBinding.getAge(this.input)
      .pipe(
        timeout(20000)
      )
      .subscribe({
        next: (data) => {
          this.model = { ...data }
          this.awaiting = false
          this.error = undefined
          this.nameRequested.emit(data)
        },
        error: (err: Error) => {
          this.error = err.message
          this.awaiting = false
        }
      })
  }
}