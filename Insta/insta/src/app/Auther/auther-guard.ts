import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const autherGuard: CanActivateFn = (route, state) => {



  const active = sessionStorage.getItem("isLogined")=="true"

  if(active){

    return true;
  }
  else{

    const toastr = inject(ToastrService);

    toastr.success('Please login first!');

    const router = inject(Router);
    router.navigate(['/login']);
    return false ;

  }
};
