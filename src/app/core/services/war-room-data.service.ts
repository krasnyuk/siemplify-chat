import {Inject, Injectable} from '@angular/core';
import {ChatDataService} from '../../shared/modules/chat/models/chat-data-service.model';
import {ConversationRequestDM} from '../../shared/modules/chat/models/conversation-request.model';
import {Observable} from 'rxjs';
import {ChatChannelMessageDM} from '../../shared/modules/chat/models/chat-message.model';
import {ChatChannelCardDM} from '../../shared/modules/chat/models/chat-channel-card.model';
import {SendMessageRequestDM} from '../../shared/modules/chat/models/send-message-request.model';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class WarRoomDataService extends ChatDataService {

  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) {
    super();
  }

  getChatChannelConversation(request: ConversationRequestDM): Observable<Array<ChatChannelMessageDM>> {
    return this.http.get<Array<ChatChannelMessageDM>>(this.apiUrl + 'chat-messages.json', {
      params: {channelId: request.channelIdentifier}
    });
  }

  getChatChannels(id: string): Observable<Array<ChatChannelCardDM>> {
    return this.http.get<Array<ChatChannelCardDM>>(this.apiUrl + 'chat-channels.json');
  }

  hasNewChatMessages(id: string): Observable<boolean> {
    return undefined;
  }

  sendChatMessage(request: SendMessageRequestDM): Observable<ChatChannelMessageDM> {
    return this.http.post<ChatChannelMessageDM>(this.apiUrl + 'chat-messages.json', request);
  }
}
