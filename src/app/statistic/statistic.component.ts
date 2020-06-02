import {Component, Input} from '@angular/core';
import {} from '../app.component';
import {Statistic} from '../models/all-models';

@Component({
  selector     : 'gh-statistic',
  templateUrl  : './statistic.component.html',
})
export class StatisticComponent {

  @Input() statistic: Statistic;

}
