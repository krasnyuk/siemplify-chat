import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParticipantDetails} from "../models/participant-details.model";
import {delay} from "rxjs/operators";
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {
  private readonly backendUrl: string = '/assets/mocked-data/';

  constructor(private http: HttpClient) {
  }

  public getParticipants(currentUserId: string): Observable<Array<ParticipantDetails>> {
    return this.http.get<Array<ParticipantDetails>>(this.backendUrl + 'participant-details.json').pipe(
      delay(200)
    );
  }

  public getConversation(participantId: string, currentUserId: string): Observable<Array<ChatMessage>> {
    return this.http.get<Array<ChatMessage>>(this.backendUrl + 'chat-messages.json').pipe(
      delay(200)
    );
  }
}
