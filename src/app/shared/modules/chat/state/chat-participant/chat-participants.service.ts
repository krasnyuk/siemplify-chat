import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {delay, map, switchMap, tap} from 'rxjs/operators';
import {ChatParticipantsStore} from './chat-participants.store';
import {Observable, timer} from "rxjs";

import {API_URL} from "../../../../../core/tokens/api-url.token";
import {ChatParticipant} from "./chat-participant.model";
import {withTransaction} from "@datorama/akita";

@Injectable({providedIn: 'root'})
export class ChatParticipantsService {

  constructor(private chatParticipantsStore: ChatParticipantsStore,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) {
  }

  public getParticipantsWithInterval(interval: number = 5000): Observable<Array<ChatParticipant>> {
    return timer(0, interval).pipe(
      switchMap(() => this.getParticipants())
    );
  }

  private getParticipants(): Observable<Array<ChatParticipant>> {
    this.chatParticipantsStore.setLoading(true);
    return this.http.get<Array<ChatParticipant>>(this.apiUrl + 'participant-details.json').pipe(
      // TODO: delete emulated response time
      delay(100),
      // TODO: delete - emulates hasNewMessages changes for polling demo
      map((participants: Array<ChatParticipant>) => participants.map((item: ChatParticipant) => ({
        ...item,
        hasNewMessages: Math.random() >= 0.1 // TODO: delete. Generates random boolean for demo purpose
      }))),
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
