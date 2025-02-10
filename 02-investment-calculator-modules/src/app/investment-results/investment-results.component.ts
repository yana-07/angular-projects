import { Component, inject, computed } from '@angular/core';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  // 'results' is now a computed readonly signal - makes sure that the data managed by the service cannot be modified from outside the service
  // results = this.investmentService.resultData.asReadonly(); -  alternative
  results = computed(() => this.investmentService.resultData());
}
