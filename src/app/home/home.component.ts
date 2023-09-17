import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { headShake, shakeY } from 'ng-animate';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('headShake', [transition('* => *', useAnimation(headShake), {params: { timing: 2}})]),
    trigger('shakeY', [transition('* => *', useAnimation(shakeY), {params: { timing:1}})])
],
})
export class HomeComponent {
  nbs: number[] = [];
  limit = 4;
  streak = 1;
  hero_style =  ""
  result = -1;
  answer = "";
  successAnimation: any;
  errorAnimation: any;
  input_style=""

    constructor() { 
      if (localStorage.getItem("limit") != null) {
        this.limit = Number(localStorage.getItem("limit"));
      }
      if (localStorage.getItem("streak") != null) {
        this.streak = Number(localStorage.getItem("streak"));
      }
      this.changebg();
      this.rollDice();
    }

    rollDice(): void {
      this.nbs = [];
      this.result = 0
      for (let i = 0; i < this.limit; i++) {
        this.nbs.push(Math.floor(Math.random() * 99) + 1);
        this.result += this.nbs[i];
      }
    }



    changebg(): void {
      const bgs = [
        "background: #FC5C7D;  background: -webkit-linear-gradient(to right, #6A82FB, #FC5C7D); background: linear-gradient(to right, #6A82FB, #FC5C7D); ", 
        "background: #FC466B;  background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B); background: linear-gradient(to right, #3F5EFB, #FC466B); ", 
        "background: #c94b4b;  background: -webkit-linear-gradient(to right, #4b134f, #c94b4b); background: linear-gradient(to right, #4b134f, #c94b4b); ",
        "background: #0f0c29;  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29); background: linear-gradient(to right, #24243e, #302b63, #0f0c29); ",
        "background: #00b09b;  background: -webkit-linear-gradient(to right, #96c93d, #00b09b); background: linear-gradient(to right, #96c93d, #00b09b); ",
        "background: #40E0D0; background: -webkit-linear-gradient(to right, #FF0080, #FF8C00, #40E0D0); background: linear-gradient(to right, #FF0080, #FF8C00, #40E0D0);"
      ]
      this.hero_style = bgs[Math.floor(Math.random() * bgs.length)];
      
    }

    valid(): void {
      if (this.answer == String(this.result)) {
        this.input_style="has-background-success is-success has-text-white"
        this.answer = this.result.toString();
        this.successAnimation = this.result;
        setTimeout(() => {
          this.streak += 1;
          localStorage.setItem("streak", this.streak.toString());
        this.nbs = [];
        this.result = -1;
        this.answer = "";
        this.input_style = "";
        this.rollDice();
        }, 1000);

        
      
      } else {
        this.input_style="has-background-danger is-danger has-text-white"
        this.answer = this.result.toString();
        this.errorAnimation = this.result;
        
        setTimeout(() => {
          this.input_style = "";
          this.streak = 0;
          localStorage.setItem("streak", this.streak.toString());
        this.nbs = [];
        this.result = -1;
        this.answer = "";
        this.rollDice();
        }, 2000);
      }
    }

    limitChanged(){
      localStorage.setItem("limit", this.limit.toString());
      this.rollDice();
    }

}
