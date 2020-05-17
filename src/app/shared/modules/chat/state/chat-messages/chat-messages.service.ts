import {Inject, Injectable} from '@angular/core';
import {ChatMessagesStore} from './chat-messages.store';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../../../core/tokens/api-url.token";
import {EMPTY, Observable} from "rxjs";
import {ChatParticipant} from "../chat-participant/chat-participant.model";
import {catchError, delay, map, tap} from "rxjs/operators";
import {guid, withTransaction} from "@datorama/akita";
import {ChatMessage} from "./chat-message.model";

@Injectable({providedIn: 'root'})
export class ChatMessagesService {

  constructor(protected chatMessagesStore: ChatMessagesStore,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) {
  }

  public getChatMessages(participantId: string): Observable<Array<ChatMessage>> {
    this.chatMessagesStore.setLoading(true);
    return this.http.get<Array<ChatMessage>>(this.apiUrl + 'chat-messages.json', {params: {participantId}}).pipe(
      // TODO: delete emulated response time
      delay(100),
      withTransaction((messages: Array<ChatMessage>) => {
        this.chatMessagesStore.set(messages);
        this.chatMessagesStore.setLoading(false);
      })
    );
  }

  /** Mocked send message */
  public sendMessage(messageContent: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.apiUrl + 'chat-messages.json', {messageContent}).pipe(
      catchError(() => {
        this.chatMessagesStore.add({
          id: guid(),
          timeUnixTime: new Date().toISOString(),
          message: messageContent,
          senderId: '1',
          receiverId: '777'
        });
        return EMPTY;
      }),
    );
  }

}
