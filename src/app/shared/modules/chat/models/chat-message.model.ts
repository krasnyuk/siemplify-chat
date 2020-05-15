export interface ChatMessageModel {
  id: string;
  senderId: string;
  receiverId: string;
  timeUnixTime: string;
  message: string;
}
