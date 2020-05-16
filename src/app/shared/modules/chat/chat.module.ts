import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {SmpDialogComponentsModule} from "@siemplify/ui";
import {OverlayContainer} from "@angular/cdk/overlay";


@NgModule({
  imports: [
    CommonModule,
    SmpDialogComponentsModule,
  ],
  declarations: [ChatComponent, ChatDialogComponent],
  exports: [ChatComponent]
})
export class ChatModule {
  constructor(overlayContainer: OverlayContainer) {
    /* TODO: replace with theme name const / enum */
    overlayContainer.getContainerElement().classList.add('simp-theme-default');
  }
}
