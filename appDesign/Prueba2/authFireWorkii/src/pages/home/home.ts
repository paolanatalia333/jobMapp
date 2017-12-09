import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';
import {
    AuthProvider
} from '../../providers/auth/auth';
import {
    AngularFireAuth
} from 'angularfire2/auth';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public userEm = "";

    constructor(public navCtrl: NavController, public authData: AuthProvider, public afAuth: AngularFireAuth) {

        this.userEm = this.afAuth.auth.currentUser.email;
    }
    goToProfile(): void {
        this.navCtrl.push("ProfilePage");
    }
    logoutUsr(): void {
        this.authData.logoutUser().then(() => this.navCtrl.setRoot('LoginPage'));
    }
    goToCreate(): void {
        this.navCtrl.push('WorkiiCreatePage');
    }
    goToList(): void {
        this.navCtrl.push('WorkiiListPage');
    }
}
