import { Injectable } from '@angular/core';

/** Simplified global service for getting mocked current user data */

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private _userId: string = '1';

  get userId(): string {
    return this._userId;
  }

  constructor() { }
}
