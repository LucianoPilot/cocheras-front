import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const soloLogueadoGuard: CanActivateFn = (route, state) => {
  return true;
};
