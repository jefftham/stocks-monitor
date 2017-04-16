import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.inbox
      .subscribe(
      (msg) => {
        this.msgs.push(msg);
      }
      );
  }

}
