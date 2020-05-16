import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {delay, tap} from 'rxjs/operators';
import {ChatParticipantsStore} from './chat-participants.store';
import {Observable} from "rxjs";

import {API_URL} from "../../../../../core/tokens/api-url.token";
import {ChatParticipant} from "./chat-participant.model";
import {withTransaction} from "@datorama/akita";

@Injectable({providedIn: 'root'})
export class ChatParticipantsService {

  constructor(private chatParticipantsStore: ChatParticipantsStore,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) {
  }

  public getParticipants(): Observable<Array<ChatParticipant>> {
    this.chatParticipantsStore.setLoading(true);
    return this.http.get<Array<ChatParticipant>>(this.apiUrl + 'participant-details.json').pipe(
      delay(100), // TODO: mocked response
      withTransaction((participants: Array<ChatParticipant>) => {
        this.chatParticipantsStore.set(participants);
        this.chatParticipantsStore.setLoading(false);
      })
    );
  }

  public updateParticipantsSearchFilter(filter: string): void {
    this.chatParticipantsStore.updateParticipantsSearchFilter(filter);
  }
}
