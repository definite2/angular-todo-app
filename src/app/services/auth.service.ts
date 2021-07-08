import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  user: Observable<firebase.User>;
  constructor(
    public fireAuth: AngularFireAuth,
    public store: AngularFirestore,
    public router: Router
  ) {
    this.authenticated$ = this.fireAuth.authState.pipe(map((user) => !!user));
    this.user = fireAuth.authState;
    this.uid$ = fireAuth.authState.pipe(map((user) => user.uid));
  }
  signIn(provider: firebase.auth.AuthProvider): Promise<any> {
    return this.fireAuth.signInWithPopup(provider);
  }
  signInWithGoogle(): Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }
  signInWithGithub(): Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider());
  }
  private postSignIn(): void {
    this.router.navigate(['/tasks']);
  };
  signOut() {
    this.fireAuth.signOut().then((_) => this.router.navigate(['/'])).catch((error) => {
     console.log("signout error",error)
    });;
  }
}
