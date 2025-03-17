import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { getAuth } from 'firebase/auth';

export const AuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  
  const user = getAuth().currentUser;
  if (!!user)
    return true;
  router.navigateByUrl('/landing');
  return false;
};
