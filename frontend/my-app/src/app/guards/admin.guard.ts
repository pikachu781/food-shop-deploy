import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const isAdmin = localStorage.getItem('adminLoggedIn');

  if (isAdmin === 'true') {
    return true;
  }

  return false;
};