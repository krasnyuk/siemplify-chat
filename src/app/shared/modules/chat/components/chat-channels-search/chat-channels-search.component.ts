import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatChannelsService} from '../../state/chat-channels/chat-channels.service';
import {FormControl} from '@angular/forms';
import {SmpComponentSizes} from '@siemplify/ui';
import {BaseUnsubscribe} from '../../../../../core/base/base-unsubscribe';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-chat-channels-search',
  templateUrl: './chat-channels-search.component.html',
  styleUrls: ['./chat-channels-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatChannelsSearchComponent extends BaseUnsubscribe implements OnInit {
  public searchControl = new FormControl(null);
  public readonly searchIcon = { name: 'search', pack: 'smp-components' };
  public actionSize = SmpComponentSizes;

  constructor(private chatChannelsService: ChatChannelsService) {
    super();
  }

  ngOnInit(): void {
    this.updateChatChannelsSearchFilter();
  }

  private updateChatChannelsSearchFilter() {
    this.searchControl.valueChanges.pipe(
      tap((searchValue: string) => this.chatChannelsService.updateChannelsSearchFilter(searchValue)),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }
}
