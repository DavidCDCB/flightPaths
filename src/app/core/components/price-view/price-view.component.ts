import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnInit {

  constructor() { }

  @Input()
  public price?: string = "";

  @Output() 
  public emitPrice = new EventEmitter<string>();

  ngOnInit() {
  }

}
