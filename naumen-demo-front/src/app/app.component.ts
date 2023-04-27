import { Component, EventEmitter, Output } from '@angular/core';
import { AgeModel } from './ageModel';
import { BackBindingService } from './back-binding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private backBinding: BackBindingService) {}

  title = 'naumen-demo-front';

  oldest?: AgeModel

  ages: Map<string, AgeModel> = new Map()

  ngOnInit() {
    this.backBinding.getOldest()
      .subscribe((data: AgeModel) => this.oldest = { ...data })
    this.backBinding.getAll()
      .subscribe((data: AgeModel[]) =>
        data.forEach(model => this.ages.set(model.name,  model)))
  }
  
  onNameRequested(model: AgeModel) {
    // Update view without making new requests
    this.ages.set(model.name, model)
    if (this.oldest && model.age >= this.oldest.age) {
      this.oldest = model
    }
  }
}
