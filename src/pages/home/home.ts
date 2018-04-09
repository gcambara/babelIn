import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular'; //gcambara: hid this to avoid lint error, guess I'll need it in the future.
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};
  showUser: boolean = false;

  constructor(
    
    //gcambara: hid this to avoid lint error, guess I'll need it in the future.
    //private navCtrl: NavController,
    //private navParams: NavParams,
    private facebook: Facebook
   ) {}

  ionViewDidLoad(){
    console.log('ionViewDidLoad HomePage');
  }

  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if (rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error(error);
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true;
      this.user = data;
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
