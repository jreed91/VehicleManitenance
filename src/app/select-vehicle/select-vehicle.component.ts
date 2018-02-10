import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.css']
})
export class SelectVehicleComponent implements OnInit {

  @Input() items: SelectVehicleComponent[];
  @Input() keys: SelectVehicleComponent[];
  @Input() control: FormControl;
  @ViewChild('input') inputRef: ElementRef;

  constructor() {
  }

  ngOnInit() {
    console.log(this.control);
  }

  tngAfterViewInit() {
    // You should see the actual form control properties being passed in
    console.log('control', this.control);
 }

}
