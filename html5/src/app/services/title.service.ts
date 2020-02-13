import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable()
export class TitleService {

  constructor(private titleService: Title) { }
  setTitle(data): void {
    this.titleService.setTitle(environment.siteName + ' - ' + data);
  }
}