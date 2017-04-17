import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {

  msgs: Message[] = [];
  notify = false;
  onOff = this.notify ? 'On' : 'Off';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.inbox
      .subscribe(
      (msg) => {
        this.msgs.push(msg);
      }
      );
  }

  onToggleNofitication() {
    this.notify = !this.notify;
    this.onOff = this.notify ? 'On' : 'Off';
  }

}
