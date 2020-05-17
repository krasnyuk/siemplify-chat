import {Injectable} from '@angular/core';

/** Mock service to get current user ID, image, name etc */

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  get userName(): string {
    return this._userName;
  }
  get userImage(): string {
    return this._userImage;
  }
  get userId(): string {
    return this._userId;
  }

  private _userId: string = '1';
  private _userName: string = 'Artem Krasniuk';
  private _userImage: string = 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png';

  constructor() {
  }
}
