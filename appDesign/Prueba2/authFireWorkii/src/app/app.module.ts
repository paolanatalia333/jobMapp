import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
// Importing AF2 Module

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProfileProvider } from '../providers/profile/profile';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyAQhWisp3h7NGxa2TyVTwCfRRmQCw5olAY",
    authDomain: "workiiploy.firebaseapp.com",
    databaseURL: "https://workiiploy.firebaseio.com",
    projectId: "workiiploy",
    storageBucket: "workiiploy.appspot.com",
    messagingSenderId: "1058803298687"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    AuthProvider,
    ProfileProvider
  ]
})
export class AppModule {}
