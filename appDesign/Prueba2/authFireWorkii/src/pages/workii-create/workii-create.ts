import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular';
import {
    WorkiiProvider
} from "../../providers/workii/workii";

/**
 * Generated class for the WorkiiCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-workii-create',
    templateUrl: 'workii-create.html',
})
export class WorkiiCreatePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: WorkiiProvider) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkiiCreatePage');
    }
    createEvent(
        eventName: string,
        eventDate: string,
        eventPrice: number,
        eventCost: number
    ): void {
        this.eventProvider
            .createEvent(eventName, eventDate, eventPrice, eventCost)
            .then(newEvent => {
                this.navCtrl.pop();
            });
    }

}
