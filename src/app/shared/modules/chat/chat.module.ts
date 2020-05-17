import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {SmpActionsModule, SmpAvatarModule, SmpDialogComponentsModule, SmpHighlightModule} from "@siemplify/ui";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ChatMessagesComponent} from './components/chat-messages/chat-messages.component';
import {ChatInputAreaComponent} from './components/chat-input-area/chat-input-area.component';
import {ChatParticipantCardComponent} from './components/chat-participant-card/chat-participant-card.component';
import {ChatParticipantsComponent} from './components/chat-participants/chat-participants.component';
import { ChatParticipantsSearchComponent } from './components/chat-participants-search/chat-participants-search.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ChatMessagesListComponent } from './components/chat-messages-list/chat-messages-list.component';


@NgModule({
  imports: [
    CommonModule,
    SmpDialogComponentsModule,
    SmpAvatarModule,
    ReactiveFormsModule,
    SmpActionsModule,
    SmpHighlightModule
  ],
  declarations: [ChatComponent, ChatDialogComponent, ChatMessagesComponent, ChatInputAreaComponent, ChatParticipantCardComponent, ChatParticipantsComponent, ChatParticipantsSearchComponent, ChatMessagesListComponent],
  exports: [ChatComponent]
})
export class ChatModule {
  constructor(overlayContainer: OverlayContainer) {
    /* TODO: replace with theme name const / enum */
    overlayContainer.getContainerElement().classList.add('simp-theme-default');
  }
}
