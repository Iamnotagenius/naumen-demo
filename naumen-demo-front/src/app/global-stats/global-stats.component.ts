import { Component, Input, NgIterable } from '@angular/core';
import { AgeModel } from '../ageModel';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.css']
})
export class GlobalStatsComponent {
  @Input() rows: NgIterable<AgeModel> = [] 
}
