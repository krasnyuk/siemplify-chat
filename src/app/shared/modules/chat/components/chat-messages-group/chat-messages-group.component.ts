import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';
import {ChatChannelMessageDM} from '../../models/chat-message.model';
import {Observable} from 'rxjs';
import {ChatMessagesQuery} from '../../state/chat-messages/chat-messages.query';

@Component({
  selector: 'app-chat-messages-group',
  templateUrl: './chat-messages-group.component.html',
  styleUrls: ['./chat-messages-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesGroupComponent implements OnInit {
  firstUnreadMessageId$: Observable<number> = this.chatMessagesQuery.firstUnreadMessageId$;
  unreadMessagesCount$: Observable<number> = this.chatMessagesQuery.unreadMessagesCount$;

  @Input() messagesGroup: ChatMessagesGroupVM;

  constructor(private chatMessagesQuery: ChatMessagesQuery) {
  }

  ngOnInit(): void {
  }

  public trackById(index: number, message: ChatChannelMessageDM) {
    return message.id;
  }

}
