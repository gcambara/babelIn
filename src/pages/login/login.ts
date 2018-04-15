import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

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
  loginForm: FormGroup;
  loginError: string;
  user = {} as User;
  facebookUser: any = {};
  showFacebookUser: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook, private auth: AuthService, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithEmail() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['public_profile', 'email'])
      .then(response => {
        console.log(response.status);
        if (response.status == 'connected') {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential).
            then(success => {
              console.log("Firebase success: " + JSON.stringify(success));
              this.getInfo();
            });
        }
      }).catch((error) => { console.log(error) });
  }


  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log(error.message)
      );
  }

  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        console.log(data);
        this.showFacebookUser = true;
        this.facebookUser = data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
