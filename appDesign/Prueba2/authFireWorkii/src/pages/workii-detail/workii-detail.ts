import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    Alert,
    AlertController
} from 'ionic-angular';
import {
    WorkiiProvider
} from "../../providers/workii/workii";
import {
    Camera
} from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the WorkiiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: "event-detail/:eventId"
})
@Component({
    selector: 'page-workii-detail',
    templateUrl: 'workii-detail.html',
})
export class WorkiiDetailPage {
    public currentEvent: any = {};
    public guestName: string = '';
    public guestPicture: string = null;
    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: WorkiiProvider, public cameraPlugin: Camera, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkiiDetailPage');
        this.eventProvider
            .getEventDetail(this.navParams.get("eventId"))
            .on("value", eventSnapshot => {
                this.currentEvent = eventSnapshot.val();
                this.currentEvent.id = eventSnapshot.key;
            });

    }
    addGuest(guestName: string): void {

        this.eventProvider
            .addGuest(
                guestName,
                this.currentEvent.id,
                this.currentEvent.price,
                this.guestPicture
            ).
        then(newGuest=> {
            this.guestName = "";
            this.guestPicture = null;
        });
    }
    takePicture(): void {
        this.cameraPlugin
            .getPicture({
                quality: 95,
                destinationType: this.cameraPlugin.DestinationType.DATA_URL,
                sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: this.cameraPlugin.EncodingType.PNG,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: true
            })
            .then(
                imageData => {
                    this.guestPicture = imageData;


                },
                error => {




                    console.log("ERROR -> " + JSON.stringify(error));
                }
            );
    }

}
