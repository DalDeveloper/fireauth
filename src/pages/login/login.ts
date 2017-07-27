import { Component } from '@angular/core';
import { NavController, AlertController, 
  LoadingController,Loading,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupPage, HomePage, ForgotPasswordPage } from '../pages'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public asp: AuthServiceProvider, public alertCtrl: AlertController) {
   
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  //Register User with 
  registerWithEmail(){
    this.navCtrl.push(SignupPage);
  }

  loginWithEmail(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else { 
      this.asp.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(() => {
        console.log(this.asp.afAuth.auth.currentUser);
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

  loginWithFB(){

  }

  loginWithTW(){

  }

  loginWithGP(){

  }

  gotoforgetPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }


}
