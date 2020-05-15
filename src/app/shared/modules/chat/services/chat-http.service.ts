import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {
  private readonly backendUrl: string = '/assets/mocked-data/';

  constructor(private http: HttpClient) {
  }

  public getConversation(participantId: string, currentUserId: string): Observable<Array<ChatMessage>> {
    return this.http.get<Array<ChatMessage>>(this.backendUrl + 'chat-messages.json').pipe(
      delay(200)
    );
  }
}
