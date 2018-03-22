import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaintenanceService } from '../maintenance.service';
import { Maintenance } from '../maintenance';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


export class PriceHistoryObject {
  name: string;
  series: [
    {
      value: number;
      name: string;
    }
  ]
}

@Component({
  selector: 'app-price-history-card',
  templateUrl: './price-history-card.component.html',
  styleUrls: ['./price-history-card.component.css']
})


export class PriceHistoryCardComponent implements OnInit {
  maintenaceItem: Observable<Maintenance[]>;
  priceHistoryData: any[];
  totalPrice: any[];
  sum: Number;
  

  view: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Price';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;


  constructor(private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private location: Location) {
      this.priceHistoryData = [];
      this.totalPrice = [];
      this.priceHistoryData.push({name: 'Price', series: []});
  }

  ngOnInit() {
    this.getPriceHistoryForVehicle();
    this.getTotalPriceHistory();
  }

  onSelect(event) {
    console.log(event);
  }

  getPriceHistoryForVehicle(): any {
    const id = this.route.snapshot.paramMap.get('id');
    this.maintenanceService.getMaintenanceItemsForVehicle(id)
      .flatMap((response) => response)
      .map((item) => ({ value: item.price, name: item.date.formatted }))
      .subscribe((data) => {
        this.priceHistoryData[0]['series'].push(data);
        var priceHistoryData2 = this.priceHistoryData;
        Object.assign(this, { priceHistoryData2 });
      });
  }

  getTotalPriceHistory(): any {
    const id = this.route.snapshot.paramMap.get('id');
    this.maintenanceService.getMaintenanceItemsForVehicle(id)
    .flatMap((response)=> response)
    .map((item) => (item.price))
    .subscribe((data) => {
      this.totalPrice.push(Number(data));
      this.sum = this.totalPrice.reduce((a,b) => a + b, 0);
    })
  }
}
