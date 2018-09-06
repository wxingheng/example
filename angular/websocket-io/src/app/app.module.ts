import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {WebsocketService} from './websocket.service';
import {ChatService} from './chat.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService, ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
