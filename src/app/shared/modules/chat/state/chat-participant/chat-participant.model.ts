export interface ChatParticipant {
  id: string;
  userName : string;
  userId: string;
  hasNewMessages: boolean;
  lastMessageTime: string;
  image: string;
  roleTitle: string;
}

export function createChatParticipant(params: Partial<ChatParticipant>) {
  return {

  } as ChatParticipant;
}
