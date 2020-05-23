import {Observable} from 'rxjs';
import {ChatChannelCardDM} from './chat-channel-card.model';
import {ConversationRequestDM} from './conversation-request.model';
import {ChatChannelMessageDM} from './chat-message.model';
import {SendMessageRequestDM} from './send-message-request.model';

export abstract class ChatDataService {
  abstract getChatChannels(id: string): Observable<Array<ChatChannelCardDM>>;

  abstract getChatChannelConversation(request: ConversationRequestDM): Observable<Array<ChatChannelMessageDM>>;

  abstract sendChatMessage(request: SendMessageRequestDM): Observable<ChatChannelMessageDM>;

  abstract hasNewChatMessages(id: string): Observable<boolean>;
}
