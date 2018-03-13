import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
declare const FS: any;
declare const mixpanel: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(db: AngularFirestore,
    public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        
        FS.identify(user.uid, {
          email: user.email,
          displayName: user.displayName,
          phone: user.phoneNumber
        });
        mixpanel.identify(user.uid);
        mixpanel.people.set({
          "$email": user.email,    // only special properties need the $
          "$name": user.displayName
      });
      }
    })
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
