import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {SmpActionsModule, SmpAvatarModule, SmpDialogComponentsModule, SmpHighlightModule} from '@siemplify/ui';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ChatMessagesComponent} from './components/chat-messages/chat-messages.component';
import {ChatInputAreaComponent} from './components/chat-input-area/chat-input-area.component';
import {ChatChannelCardComponent} from './components/chat-channel-card/chat-channel-card.component';
import {ChatChannelsComponent} from './components/chat-channels/chat-channels.component';
import {ChatChannelsSearchComponent} from './components/chat-channels-search/chat-channels-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatMessagesListComponent} from './components/chat-messages-list/chat-messages-list.component';
import {ChatMessagesGroupComponent} from './components/chat-messages-group/chat-messages-group.component';
import {IsTodayPipe} from './pipes/is-today.pipe';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';


@NgModule({
  imports: [
    CommonModule,
    SmpDialogComponentsModule,
    SmpAvatarModule,
    ReactiveFormsModule,
    SmpActionsModule,
    SmpHighlightModule
  ],
  declarations: [
    ChatComponent,
    ChatDialogComponent,
    ChatMessagesComponent,
    ChatInputAreaComponent,
    ChatChannelCardComponent,
    ChatChannelsComponent,
    ChatChannelsSearchComponent,
    ChatMessagesListComponent,
    ChatMessagesGroupComponent,
    IsTodayPipe,
    ChatMessageComponent,
  ],
  exports: [ChatComponent]
})
export class ChatModule {
  constructor(overlayContainer: OverlayContainer) {
    /* TODO: replace with theme name const / enum */
    overlayContainer.getContainerElement().classList.add('simp-theme-default');
  }

  static withProviders(chatProviders: Array<Provider>): ModuleWithProviders<ChatModule> {
    return {
      ngModule: ChatModule,
      providers: [...chatProviders]
    };
  }
}
