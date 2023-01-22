import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../models/Flight';

@Component({
  selector: 'app-path-table',
  templateUrl: './path-table.component.html',
  styleUrls: ['./path-table.component.css']
})
export class PathTableComponent implements OnInit {

  constructor() { }

  @Input()
  listOgFlights?: Flight[] = new Array<Flight>;

  ngOnInit() {}
}
