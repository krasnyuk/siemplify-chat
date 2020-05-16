import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";
import {SmpComponentSizes} from "@siemplify/ui";
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat-participant-card',
  templateUrl: './chat-participant-card.component.html',
  styleUrls: ['./chat-participant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantCardComponent implements OnInit {
  avatarSize = SmpComponentSizes;
  participantsSearchFilter$: Observable<string> = this.chatParticipantsQuery.participantsSearchFilter$;

  @Input() participant: ChatParticipant;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery) { }

  ngOnInit(): void {
  }

}
