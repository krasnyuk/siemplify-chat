import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ChatMessagesQuery} from "../../state/chat-messages/chat-messages.query";
import {Observable} from "rxjs";
import {ChatMessagesGroup} from "../../state/chat-messages/chat-message.model";

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesListComponent implements OnInit {
  messagesGroups$: Observable<Array<ChatMessagesGroup>> = this.chatMessagesQuery.messagesGroups$;

  constructor(private chatMessagesQuery: ChatMessagesQuery) {
  }

  ngOnInit(): void {
  }

  public trackByDate(index, group: ChatMessagesGroup) {
    return group.date.getTime();
  }

}
