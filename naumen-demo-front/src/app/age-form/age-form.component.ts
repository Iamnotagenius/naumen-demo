import { Component, EventEmitter, Output } from '@angular/core';
import { AgeModel } from '../ageModel';
import { BackBindingService } from '../back-binding.service';

@Component({
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.css']
})
export class AgeFormComponent {

  constructor (private backBinding: BackBindingService) {}

  @Output() nameRequested = new EventEmitter<AgeModel>();

  model?: AgeModel = {
    age: 10,
    name: "Test",
    requestCount: 6
  }
  input = ""
  emptySubmit = true
  awaiting = false
  onSubmit() {
    this.emptySubmit = this.input.length == 0
    if (this.emptySubmit) {
      return
    }
    this.awaiting = true
    this.backBinding.getAge(this.input)
      .subscribe((data: AgeModel) => {
        this.model = { ...data }
        this.awaiting = false
        this.nameRequested.emit(data)
      }
    )
  }
}
