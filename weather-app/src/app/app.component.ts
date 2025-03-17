import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { environment } from '../environments/environment';

type DeviceOrientation = 'isTabletPortrait' | 'isTabletLandscape' | 'isHandsetPortrait' | 'isHandsetLandscape';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Firebase Authentication
  private auth: Auth | undefined;

  // Responsive design variables
  private breakpointObserver = inject(BreakpointObserver);
  public deviceResponsive: Record<DeviceOrientation, boolean> = {
    'isTabletPortrait': false,
    'isTabletLandscape': false,
    'isHandsetPortrait': false,
    'isHandsetLandscape': false
  };

  constructor(
    private router: Router
  ) {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    // Initialize Firebase Authentication
    this.auth = getAuth(app);
  }

  ngOnInit(): void {
    // If there is an authenticated user upon loading application, then navigate to layout
    if (this.auth)
      onAuthStateChanged(this.auth, (user) => {
        if (user) // Signed in
          this.router.navigateByUrl('/layout');
      });

    // Breakpoint observer allows responsive design based on the client's device and screen size without
    // having to manually code the media queries
    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ])
      .subscribe(result => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait])
          this.resetDeviceResponsive('isTabletPortrait');
        else if (breakpoints[Breakpoints.TabletLandscape])
          this.resetDeviceResponsive('isTabletLandscape');
        else if (breakpoints[Breakpoints.HandsetPortrait])
          this.resetDeviceResponsive('isHandsetPortrait');
        else if (breakpoints[Breakpoints.HandsetLandscape])
          this.resetDeviceResponsive('isHandsetLandscape');
      })
  }

  /**
   * @description Device and/or Orientation has changed, so reset the responsive variable to update CSS
   * @param keyToUpdate keyToUpdate is to set true, all others will be set to false
   */
  private resetDeviceResponsive(keyToUpdate: DeviceOrientation): void {
    Object.keys(this.deviceResponsive).forEach((key) => {
      this.deviceResponsive[key as keyof Record<DeviceOrientation, boolean>] = key.includes(keyToUpdate) ? true : false;
    });
  }
}
