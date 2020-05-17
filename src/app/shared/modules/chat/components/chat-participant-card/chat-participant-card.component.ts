import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";
import {SmpComponentSizes} from "@siemplify/ui";
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {Observable} from "rxjs";
import {ChatParticipantsService} from "../../state/chat-participant/chat-participants.service";

@Component({
  selector: 'app-chat-participant-card',
  templateUrl: './chat-participant-card.component.html',
  styleUrls: ['./chat-participant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantCardComponent implements OnInit {
  participantsSearchFilter$: Observable<string>;
  selectedParticipantId$: Observable<string | null>;
  readonly avatarSize = SmpComponentSizes;

  @Input() participant: ChatParticipant;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery,
              private chatParticipantsService: ChatParticipantsService) {
  }

  ngOnInit(): void {
    this.participantsSearchFilter$ = this.chatParticipantsQuery.participantsSearchFilter$;
    this.selectedParticipantId$ = this.chatParticipantsQuery.selectedParticipantId$;
  }

  setSelectedParticipant(): void {
    this.chatParticipantsService.setSelectedParticipant(this.participant.id);
  }

}
