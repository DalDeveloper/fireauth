import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, 
  LoadingController,Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../pages';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController,public navParams: NavParams, public asp: AuthServiceProvider, public alertCtrl: AlertController) {
    
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
   
  }

  registerUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else { 
      this.asp.signupUser(this.signupForm.value.email,this.signupForm.value.password).then(() => {
        this.navCtrl.setRoot(HomePage);
      },
    (error)=>{
       this.loading.dismiss().then( () => {
      var errorMessage: string = error.message;
      let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
       });   
    });

    this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
