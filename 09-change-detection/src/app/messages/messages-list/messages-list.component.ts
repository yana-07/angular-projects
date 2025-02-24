import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe]
})
export class MessagesListComponent {// implements OnInit {
  private messagesService = inject(MessagesService);
  messages$ = this.messagesService.messages$;
  // private cdRef = inject(ChangeDetectorRef);
  // private destoyRef = inject(DestroyRef);
  //messages = this.messagesService.allMessages;
  // get messages() {
  //   return this.messagesService.allMessages;
  // }
  //messages: string[] = [];

  // ngOnInit() {
  //   const subsription = this.messagesService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     // make sure that change detection runs for this component
  //     this.cdRef.markForCheck();
  //   });
  //   this.destoyRef.onDestroy(() => {
  //     subsription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
