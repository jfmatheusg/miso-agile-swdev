import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html'
})

export class MsgErrorComponent implements OnInit {
  @Input() error: {};
  constructor() { }
  ngOnInit() {
  }
}
