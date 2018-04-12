import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};
  showUser: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook(): Promise<any> {
    return this.facebook.login(['public_profile', 'email'])
      .then(response => {
      console.log(response.status);
      if (response.status == 'connected'){


        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).
        then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.getInfo();
        });
      }
    }).catch((error) => {console.log(error)});
  }

  // Code for simple login
  // loginFacebook(): Promise<any> {
  //   return this.facebook.login(['public_profile', 'email'])
  //     .then(response => {
  //       console.log(response.status);
  //       if (response.status == 'connected') {
  //         this.getInfo();
  //       };
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // Code for login to Facebook
  // loginFacebook(): Promise<any> {
  //   return this.facebook.login(['public_profile', 'email'])
  //     .then(response => {
  //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

  //     firebase.auth().signInWithCredential(facebookCredential).
  //     then(success => {
  //       console.log("Firebase success: " + JSON.stringify(success));
  //     });
  //   }).catch((error) => {console.log(error)});
  // }

  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        console.log(data);
        this.showUser = true;
        this.user = data;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
