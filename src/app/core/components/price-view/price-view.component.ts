import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CurrencyConverterService } from '../../services/CurrencyConverter.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnChanges {
  public typeCurrency: string = "USD";
  public oldTypeCurrency: string = "USD";
  public converType: boolean = false;
  public firstChange: boolean = true;

  constructor(private currencyConverter: CurrencyConverterService) { }

  @Input()
  public price?: string = "";

  @Output() 
  public emitPrice = new EventEmitter<string>();

  ngOnChanges(): void {
    console.log("CAMBIO");
    this.typeCurrency = "USD";
    this.oldTypeCurrency = "USD";
  }

  checkPrice(): string | undefined{
    console.log(this.price);
    if(this.price !== undefined){
      this.convertCurrency();
    }
    return this.price;
  }

  /**
   * Por medio de una petición sincronica a un servicio externo se realiza el cambio de moneda
   */
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
