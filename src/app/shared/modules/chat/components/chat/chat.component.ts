import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {ChatParticipantsService} from "../../state/chat-participant/chat-participants.service";
import {Observable} from "rxjs";
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  participants$: Observable<Array<ChatParticipant>> = this.chatParticipantsQuery.participants$;
  participantsIsLoading$: Observable<boolean> = this.chatParticipantsQuery.participantsIsLoading$;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery,
              private chatParticipantsService: ChatParticipantsService) {
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  private loadParticipants() {
    this.chatParticipantsService.getParticipants().subscribe();
  }
}
