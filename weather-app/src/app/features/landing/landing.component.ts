import { Component, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

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

  // Authentication service for user login/register
  private authenticationService = inject(AuthenticationService);

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

  constructor(
    private router: Router
  ) {}

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
    this.resetInputFields();

    // Update the landing state to match the form to be shown
    this.landingState = this.landingState === this.landingStates.Login ?
      this.landingStates.Register :
      this.landingStates.Login;

    // Set landing boolean for the template to use
    this.isLandingStateLogin = this.landingState === this.landingStates.Login;
  }

  /**
   * @description User wants to submit the current form displayed, so process the request.
   * If successful, navigate to layout and reset input fields.
   */
  public async onSubmit(): Promise<void> {
    switch (this.landingState) {
      case this.landingStates.Login:
        if (this.email && this.password) {
          // User login and then navigate to layout
          this.authenticationService.signInWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              this.router.navigateByUrl('/layout');
              this.resetInputFields();
            })
            .catch((error) => {
              if (error instanceof FirebaseError)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
            }
          );
        }
        else
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Please fill in all the required fields`, life: 3000 });
        break;
      case this.landingStates.Register:
        if (this.email && this.password && this.isPasswordMatch) {
          // New user registration, login, and then navigate to layout
          this.authenticationService.createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              this.router.navigateByUrl('/layout');
              this.resetInputFields();
            })
            .catch((error) => {
              if (error instanceof FirebaseError)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
            });
        }
        else
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: `Please fill in all the required fields`, life: 3000 });
        break;
      default:
        this.messageService.add({ severity: 'Error', summary: 'Error', detail: `Landing State: ${this.landingState} is not valid`, life: 3000 });
        return;
    }
  }

  /**
   * @description Reset input fields back to their default
   */
  private resetInputFields(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.isShowPasswordMatch = false;
  }
}
