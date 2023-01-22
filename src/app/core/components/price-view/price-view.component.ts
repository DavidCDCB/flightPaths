import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyConverterService } from '../../services/CurrencyConverter.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnInit {
  public typeCurrency: string = "USD";
  public oldTypeCurrency: string = "USD";
  public converType: boolean = false;

  constructor(private currencyConverter: CurrencyConverterService) { }

  @Input()
  public price?: string = "";

  @Output() 
  public emitPrice = new EventEmitter<string>();

  ngOnInit() {
  }

  checkPrice(){
    console.log(this.price);
    if(this.price !== undefined){
      this.convertCurrency();
    }
    return this.price;
  }

  async convertCurrency(){
    console.log(this.typeCurrency);
    console.log(this.oldTypeCurrency);
    this.converType = true;
    const categories$ = this.currencyConverter.convertCurrency(this.oldTypeCurrency, this.typeCurrency);
    let valuePrice = await lastValueFrom(categories$);
    this.price = (parseFloat(valuePrice) * parseFloat(this.price!)).toString();
    this.oldTypeCurrency = this.typeCurrency;
    this.converType = false;
  }

}
