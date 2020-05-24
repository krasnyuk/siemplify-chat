import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatModule} from './shared/modules/chat/chat.module';
import {HttpClientModule} from '@angular/common/http';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {SmpAvatarModule, SmpDialogModule, SmpOverlayModule} from '@siemplify/ui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChatDataService} from './shared/modules/chat/models/chat-data-service.model';
import {WarRoomDataService} from './core/services/war-room-data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ChatModule.withConfig(WarRoomDataService),
    environment.production ? [] : AkitaNgDevtools,
    SmpDialogModule.forRoot(),
    SmpOverlayModule.forRoot(),
    SmpAvatarModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
