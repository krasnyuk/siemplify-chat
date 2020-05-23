import {ChannelTypes} from './chanel-types.enum';

export interface ChatChannelCardDM {
  objectId: number;
  channelIdentifier: string;
  hasNewMessages: boolean;
  type: ChannelTypes;
  title: string;
  imageBase64: string;
  roleName: string;
  roleColor: string;
  groupAdminMember: string;
  groupMembers: string[];
  lastMessage: string;
  lastViewTimeOfChannel: number;
  additionalInfo: string;
}
