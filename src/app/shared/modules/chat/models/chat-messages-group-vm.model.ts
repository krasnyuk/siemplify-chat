import {ChatChannelMessageDM} from './chat-message.model';

export interface ChatMessagesGroupVM {
  date: Date;
  messages: Array<ChatChannelMessageDM>;
}
