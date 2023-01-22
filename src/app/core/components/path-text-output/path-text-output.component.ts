import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-path-text-output',
  templateUrl: './path-text-output.component.html',
  styleUrls: ['./path-text-output.component.css']
})
export class PathTextOutputComponent implements OnInit {

  constructor() { }

  @Input()
  textInput?: string;

  ngOnInit() {}
}
