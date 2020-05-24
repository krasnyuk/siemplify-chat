import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ChatChannelMessageDM} from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {
  @Input() message: ChatChannelMessageDM;
  @Input() isFirst: boolean;
  @Input() senderSameAsPrevious: boolean;
  @Input() senderSameAsNext: boolean;
  @Input() isFirstUnread: boolean;
  @Input() unreadMessagesCount: boolean;

  public get isMine(): boolean {
    return this.message?.isCurrentUser;
  }
}
