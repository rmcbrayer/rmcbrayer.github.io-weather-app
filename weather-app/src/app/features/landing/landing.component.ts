import { Component, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

enum LandingStates {
  Login = 'Login',
  Register = 'Register'
}

interface LandingText {
  title: string;
  subTitle: string;
  submit: string;
  account: string;
  link: string;
}

@Component({
  selector: 'app-landing',
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabel,
    ButtonModule,
    Message,
    Toast
  ],
  providers: [
    MessageService
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  // Note: typically Angular Forms are the way to go here, but PrimeNG FloatLabel doesn't work with the forms

  // Message service for Toast notifications
  private messageService = inject(MessageService);

  // All the available landing states
  public landingStates = LandingStates;

  // Form that is being shown
  public landingState: LandingStates = this.landingStates.Login;
  public isLandingStateLogin: boolean = true;

  // Text for the login form
  public loginHeader: LandingText = {
    title: 'Sign In',
    subTitle: 'Welcome back! Please enter your details',
    submit: 'Sign In',
    account: 'Don\'t have an account?',
    link: 'Sign Up'
  };

  // Text for the register form
  public registerHeader: LandingText = {
    title: 'Sign Up for Free',
    subTitle: 'Thanks for joining!',
    submit: 'Sign Up',
    account: 'Already have an account?',
    link: 'Sign In'
  };

  // Input fields to collect from the user
  public email: string | undefined;
  public password: string | undefined;
  public confirmPassword: string | undefined;

  // True if the user has entered both the password and confirmPassword input fields
  // This prevents the error from showing prematurely
  public isShowPasswordMatch: boolean = false;

  // True if the password and confirmPassword match for registering a new user
  public isPasswordMatch: boolean | undefined;

  constructor() {}

  /**
   * @description Check if the entered password and confirmPassword match when a new user
   * account is being created
   */
  public onPasswordChange(): void {
    if (this.isLandingStateLogin || this.password === '' || this.confirmPassword === '')
      return;

    this.isPasswordMatch = this.password === this.confirmPassword;
    this.isShowPasswordMatch = true;
  }

  /**
   * @description User is switching between the login and register forms, so this will reset
   * any entered data and update the landing state
   */
  public onToggleForm(): void {
    // Reset the input fields
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.isShowPasswordMatch = false;

    // Update the landing state to match the form to be shown
    this.landingState = this.landingState === this.landingStates.Login ?
      this.landingStates.Register :
      this.landingStates.Login;

    // Set landing boolean for the template to use
    this.isLandingStateLogin = this.landingState === this.landingStates.Login;
  }

  /**
   * @description User wants to submit the current form displayed, so process the request.
   * For new accounts, we will hash and salt the password and store along with email.
   * For existing account, validate the entered email and password.
   * 
   * TODO: call this function on enter key from keyboard
   * TODO: store user in local storage
   * TODO: reset fields
   */
  public onSubmit(): void {
    this.messageService.add({ severity: 'warn', summary: 'Oops', detail: 'I love your enthusiasm, but this part is not ready yet!', life: 3000 });
  }
}
