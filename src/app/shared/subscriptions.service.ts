import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

// a center control all the observable subscriptions

@Injectable()
export class SubscriptionsService {

    private allSubscription: object = {};

    private subscriptions: Array<Subscription> = [];

    add(newSubscription: Subscription, subscriptionName?: string) {
        subscriptionName = subscriptionName || 'default';

        // array to keep the specific subscriptions
        let arr = [];
        if (this.allSubscription[subscriptionName]) {
            arr = this.allSubscription[subscriptionName];
        } else {
            arr = this.allSubscription[subscriptionName] = [];
        }

        arr.push(newSubscription);

    }

    cleanAll() {
        console.log('cleaning all subscriptions...');
        const allArrKey = Object.keys(this.allSubscription);
        for (const key of allArrKey) {
            this.clean(key);
        }
    }

    clean(subscriptionName: string) {
        if (this.allSubscription[subscriptionName]) {
            console.log('cleaning subscriptions of : ' + subscriptionName);
            for (const subs of this.allSubscription[subscriptionName]) {
                subs.unsubscribe();
            }
        }
    }


}
