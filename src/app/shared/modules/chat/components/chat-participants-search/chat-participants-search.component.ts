import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatParticipantsService} from "../../state/chat-participant/chat-participants.service";
import {FormControl} from "@angular/forms";
import {SmpComponentSizes} from "@siemplify/ui";
import {BaseUnsubscribe} from "../../../../../core/base/base-unsubscribe";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-chat-participants-search',
  templateUrl: './chat-participants-search.component.html',
  styleUrls: ['./chat-participants-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatParticipantsSearchComponent extends BaseUnsubscribe implements OnInit {
  public searchControl = new FormControl(null);
  public readonly searchIcon = { name: 'search', pack: 'smp-components' };
  public actionSize = SmpComponentSizes;

  constructor(private chatParticipantsService: ChatParticipantsService) {
    super();
  }

  ngOnInit(): void {
    this.updateChatParticipantsSearchFilter();
  }

  private updateChatParticipantsSearchFilter() {
    this.searchControl.valueChanges.pipe(
      tap((searchValue: string) => this.chatParticipantsService.updateParticipantsSearchFilter(searchValue)),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
