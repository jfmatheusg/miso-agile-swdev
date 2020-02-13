import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TitleService } from 'src/app/services/title.service';
@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html'
})

export class MsgErrorComponent implements OnInit {
  @Input() error: {};
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Error');
  }
  ngOnInit() { }
}
