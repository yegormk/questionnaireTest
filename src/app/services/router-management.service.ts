import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class routerManagement {
  constructor(private router: Router) {}

  moveTo(path: string): void {
    this.router.navigate([path]);
  }
}
