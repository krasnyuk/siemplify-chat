import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {SmpDialogComponentsModule} from "@siemplify/ui";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ChatMessagesComponent} from './components/chat-messages/chat-messages.component';
import {ChatInputAreaComponent} from './components/chat-input-area/chat-input-area.component';
import {ChatParticipantCardComponent} from './components/chat-participant-card/chat-participant-card.component';
import {ChatParticipantsComponent} from './components/chat-participants/chat-participants.component';


@NgModule({
  imports: [
    CommonModule,
    SmpDialogComponentsModule,
  ],
  declarations: [ChatComponent, ChatDialogComponent, ChatMessagesComponent, ChatInputAreaComponent, ChatParticipantCardComponent, ChatParticipantsComponent],
  exports: [ChatComponent]
})
export class ChatModule {
  constructor(overlayContainer: OverlayContainer) {
    /* TODO: replace with theme name const / enum */
    overlayContainer.getContainerElement().classList.add('simp-theme-default');
  }
}
