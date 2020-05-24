import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatChannelsService} from '../../state/chat-channels/chat-channels.service';
import {FormControl} from '@angular/forms';
import {SmpComponentSizes} from '@siemplify/ui';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chat-channels-search',
  templateUrl: './chat-channels-search.component.html',
  styleUrls: ['./chat-channels-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatChannelsSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl(null);
  readonly searchIcon = {name: 'search', pack: 'smp-components'};
  readonly actionSize = SmpComponentSizes;
  private componentDestroyed = new Subject();

  constructor(private chatChannelsService: ChatChannelsService) {
  }

  ngOnInit(): void {
    this.updateChatChannelsSearchFilter();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  private updateChatChannelsSearchFilter() {
    this.searchControl.valueChanges.pipe(
      tap((searchValue: string) => this.chatChannelsService.updateChannelsSearchFilter(searchValue)),
      takeUntil(this.componentDestroyed)
    ).subscribe();
  }
}
