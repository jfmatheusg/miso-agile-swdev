import { Injectable } from '@angular/core';
@Injectable()
export class UserSessionService {
  profile: {};
  ok: Boolean = false;

  reset() {
    this.profile = {};
    this.ok = false;
  }
}
