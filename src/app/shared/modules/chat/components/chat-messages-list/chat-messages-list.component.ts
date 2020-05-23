import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatMessagesQuery} from '../../state/chat-messages/chat-messages.query';
import {Observable} from 'rxjs';
import {ChatMessagesGroupVM} from '../../models/chat-messages-group-vm.model';

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesListComponent implements OnInit {
  messagesGroups$: Observable<Array<ChatMessagesGroupVM>> = this.chatMessagesQuery.messagesGroups$;

  constructor(private chatMessagesQuery: ChatMessagesQuery) {
  }

  ngOnInit(): void {
  }

  public trackByDate(index, group: ChatMessagesGroupVM) {
    return group.date.getTime();
  }

}
