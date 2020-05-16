import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {ChatParticipant} from "../../state/chat-participant/chat-participant.model";
import {ChatParticipantsQuery} from "../../state/chat-participant/chat-participants.query";
import {ChatParticipantsService} from "../../state/chat-participant/chat-participants.service";

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantsComponent implements OnInit {
  participants$: Observable<Array<ChatParticipant>> = this.chatParticipantsQuery.participants$;
  participantsIsLoading$: Observable<boolean> = this.chatParticipantsQuery.participantsIsLoading$;

  constructor(private chatParticipantsQuery: ChatParticipantsQuery,
              private chatParticipantsService: ChatParticipantsService) {
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  public trackById(index: number, item: { id: string }) {
    return item.id;
  }

  private loadParticipants() {
    this.chatParticipantsService.getParticipants().subscribe();
  }

}
