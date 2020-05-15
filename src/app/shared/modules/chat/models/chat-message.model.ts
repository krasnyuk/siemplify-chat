export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  timeUnixTime: string;
  message: string;
}
