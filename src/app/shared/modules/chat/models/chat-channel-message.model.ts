export interface ChatChannelMessageDM {
  objectId: number;
  channelIdentifier: string;
  sentTime: number;
  fromMember: string;
  fromMemberName: string;
  isCurrentUser: boolean;
  message: string;
}
