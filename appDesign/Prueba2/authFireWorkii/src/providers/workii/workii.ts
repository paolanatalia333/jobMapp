import {
    Injectable
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    Alert,
    AlertController
} from 'ionic-angular';
import {
    Http
} from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the WorkiiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//event sera workii

@Injectable()
export class WorkiiProvider {

    public eventListRef: firebase.database.Reference;
    private usId;

    constructor(public alertCtrl: AlertController) {
        console.log('Hello WorkiiProvider Provider');


        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.eventListRef = firebase
                    .database()
                    .ref(`/workiis`);
                this.usId = user.uid;
            }
        });
    }
    //crear workii
    createEvent(
        eventName: string,
        eventDate: string,
        eventPrice: number
    ): firebase.database.ThenableReference {
           var fe= new Date().toLocaleString();
             console.log(fe);
        return this.eventListRef.push({
            name: eventName,
            date: eventDate,
            price: eventPrice * 1,
            idAutor: this.usId,
            fecha: fe
        });
    }

    getEventList(): firebase.database.Reference {
        return this.eventListRef;
    }
    getEventDetail(eventId: string): firebase.database.Reference {
        return this.eventListRef.child(eventId);
    }
    addGuest(guestName: string,
        eventId: string,
        eventPrice: number,
        guestPicture: string): PromiseLike<any> {




if (guestPicture != null) {
      const alert: Alert = this.alertCtrl.create({
            message: "Your first name & lastname",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Save"
                }
            ]
        });
        alert.present();

            firebase
                .storage()
                .ref('/guestProfile/').child('profilePicture.png')
                .putString(guestPicture, 'base64', {
                    contentType: 'image/png'
                })
                .then(savedPicture => {
                    this.eventListRef
                        .child(`${eventId}/guestList/profilePicture`)
                        .set(savedPicture.downloadURL);
                });
        }
        return this.eventListRef
            .child(`${eventId}/guestList`)
            .push({
                guestName
            })
            .then((newGuest) => {



            });







    }

}


