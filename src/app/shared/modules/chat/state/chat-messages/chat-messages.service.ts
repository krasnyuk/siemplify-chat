import {Injectable} from '@angular/core';
import {ChatMessagesStore} from './chat-messages.store';
import {EMPTY, Observable} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {withTransaction} from '@datorama/akita';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {ConversationRequestDM} from '../../models/conversation-request.model';
import {SendMessageRequestDM} from '../../models/send-message-request.model';
import {ChatDataService} from '../../models/chat-data-service.model';

@Injectable({providedIn: 'root'})
export class ChatMessagesService {

  constructor(protected chatMessagesStore: ChatMessagesStore,
              private chatDataService: ChatDataService) {
  }

  /* TODO: use real objectId */
  public getChannelMessages(channelId: string, objectId: number = 0): Observable<Array<ChatChannelMessageDM>> {
    this.chatMessagesStore.setLoading(true);
    const request: ConversationRequestDM = {channelIdentifier: channelId, objectId};
    /* TODO: replace with post */
    return this.chatDataService.getChatChannelConversation(request).pipe(
      // TODO: delete emulated response time
      delay(100),
      withTransaction((messages: Array<ChatChannelMessageDM>) => {
        this.chatMessagesStore.set(messages);
        this.chatMessagesStore.setLoading(false);
      })
    );
  }

  /** Mocked send message */
  public sendMessage(messageContent: string, channelId: string = 'some', objectId: number = 0): Observable<ChatChannelMessageDM> {
    const request: SendMessageRequestDM = {message: messageContent, channelIdentifier: channelId, objectId};
    return this.chatDataService.sendChatMessage(request).pipe(
      catchError(() => {
        this.chatMessagesStore.add({
          id: Math.floor(Math.random() * 100000),
          sentTime: new Date().getTime(),
          message: messageContent,
          fromMember: '1',
          isCurrentUser: true,
          fromMemberName: 'Me',
          channelIdentifier: channelId,
          objectId
        });
        return EMPTY;
      }),
    );
  }

}
