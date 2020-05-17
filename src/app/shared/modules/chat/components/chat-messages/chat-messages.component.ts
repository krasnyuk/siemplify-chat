import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {Observable} from "rxjs";
import {fadeInOutAnimation} from "../../../../../core/animations/fade-in-out.animation";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()]
})
export class ChatMessagesComponent implements OnInit {
  hasSelectedParticipant$: Observable<boolean> = this.chatParticipantsQuery.hasSelectedParticipant$;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery) { }

  ngOnInit(): void {
  }

}
