import { Injectable } from '@angular/core';
import { Message } from "primeng/primeng";
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MessageService {

    inbox = new Subject();

    send(type: string, summary: string, detail?: string) {
        return { severity: type, summary: summary, detail: detail };
    }
}
