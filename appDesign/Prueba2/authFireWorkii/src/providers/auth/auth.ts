import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase/app';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {}

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {
       const userId: string = this.afAuth.auth.currentUser.uid;
       firebase.database()
       .ref(`/usuarios/${userId}`).off();

    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth
         .createUserWithEmailAndPassword(newEmail, newPassword).catch(error=> {
        console.error(error);
                             throw new Error(error);});
  }

}
