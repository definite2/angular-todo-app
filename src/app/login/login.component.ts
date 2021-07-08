import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  signInWithGoogle() {
    this.auth.signInWithGoogle().then((_) => this.postSignIn());
  }
  signInWithGithub() {
    this.auth.signInWithGithub().then((_) => this.postSignIn());
  }
  private postSignIn(): void {
    this.router.navigate(['/todos']);
  }
  logout() {
    this.auth.signOut();
  }
}
