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
 * Generated class for the WorkiiListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-workii-list',
    templateUrl: 'workii-list.html',
})
export class WorkiiListPage {

    public eventList: Array < any > ;
    constructor(
        public navCtrl: NavController,
        public eventProvider: WorkiiProvider
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkiiListPage');
        this.eventProvider.getEventList().on("value", eventListSnapshot => {
            this.eventList = [];
            eventListSnapshot.forEach(snap => {
                this.eventList.push({
                    id: snap.key,
                    name: snap.val().name,
                    price: snap.val().price,
                    date: snap.val().date
                });
                return false;
            });
        });
    }
    goToEventDetail(eventId): void {
        this.navCtrl.push('WorkiiDetailPage', {
            eventId: eventId
        });
    }
}
