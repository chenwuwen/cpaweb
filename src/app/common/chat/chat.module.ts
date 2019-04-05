import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatService} from './chat.service';
import {ChatComponent} from './chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ChatService],
  declarations: [ChatComponent],
  exports: [ChatComponent]
})
export class ChatModule {
}
