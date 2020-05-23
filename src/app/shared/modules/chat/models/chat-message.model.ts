export interface ChatChannelMessageDM {
  id: number;
  objectId: number;
  channelIdentifier: string;
  sentTime: number;
  fromMember: string;
  fromMemberName: string;
  isCurrentUser: boolean;
  message: string;
}
