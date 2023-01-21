import { Component } from '@angular/core';
import { Flight } from './core/models/Flight';
import { Journey } from './core/models/Journey';
import { Transport } from './core/models/Transport';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnica';
  textOutput?: Transport;
  textResult?: string;

  convertJourney(outputData: Journey): void{
    this.textResult = JSON.stringify(outputData, null, 2);
  }

}
