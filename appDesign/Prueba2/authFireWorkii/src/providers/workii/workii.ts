import {
    Injectable
} from '@angular/core';
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
    constructor() {
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
        eventPrice: number,
        eventCost: number
    ): firebase.database.ThenableReference {
        return this.eventListRef.push({
            name: eventName,
            date: eventDate,
            price: eventPrice * 1,
            cost: eventCost * 1,
            revenue: eventCost * -1,
            idAutor: this.usId
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
        guestPicture: string = null): PromiseLike < any > {
        if (guestPicture != null) {
            firebase
                .storage()
                .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
                .putString(guestPicture, 'base64', {
                    contentType: 'image/png'
                })
                .then(savedPicture => {
                    this.eventListRef
                        .child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
                        .set(savedPicture.downloadURL);
                });
        }
        return this.eventListRef
            .child(`${eventId}/guestList`)
            .push({
                guestName
            })
            .then(newGuest => {
                this.eventListRef.child(eventId).transaction(event => {
                    event.revenue += eventPrice;
                    return event;
                });
            });
    }

}
