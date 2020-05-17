export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  timeUnixTime: string;
  message: string;
}

export interface ChatMessagesGroup {
  date: Date;
  messages: Array<ChatMessage>;
}
