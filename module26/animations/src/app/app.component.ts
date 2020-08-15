import { Component } from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState',[
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'orange',
        'transform': 'translateX(150px)'
      })),
      transition('normal <=> highlighted', animate(400)),
      // transition('highlighted => normal', animate(500))
    ]),
    trigger('shrinkState',[
      state('normal', style({
        'background-color': 'red',
        'transform': 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'orange',
        'transform': 'translateX(150px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'blue',
        'transform': 'translateX(150px) scale(0.5)'
      })),
      transition('normal <=> highlighted', animate(400)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'green'
        }),
        animate(500, style({
          'border-radius': '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1',[
      state('normal', style({
        opacity: 1,
        'transform': 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }), animate(300)]),
      transition('* => void', [
        animate(900, style({
          opacity: 0,
          'transform': 'translateX(100px)'
        }))
      ])
      // transition('highlighted => normal', animate(500))
    ]),
    trigger('list2',
      [
        state(
        'normal', style({
          opacity: 1,
          'transform': 'translateX(0px)',
        })
      ), transition('void => *', [
          animate(500, keyframes([
            style({
              'transform': 'translateX(-100px)',
              opacity: 0,
              offset: 0 // offset==> the time stamp at which the keyframe occurs
            }),
            style({
              'transform': 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3 // 1/3 المشوار
            }),
            style({
              'transform': 'translateX(-20px)',
              opacity: 0.8,
              offset: 0.8
            }),
            style({
              'transform': 'translateX(0px)',
              opacity: 1,
              offset: 1
            })
          ]))
      ]),
        transition('* => void', [
          group([
            animate(300, style({
              color: 'red'
            })),
            animate(900, style({
              opacity: 0,
              'transform': 'translateX(100px)'
            }))
          ])
        ])
    ])
  ]
})

// الفرق بين انيمايت اللي بتاخد ستايل وبين الستايل اللي بعدها انيمايت إن الأولى بتاخد الستايل اللي هيبقى في الحالة التانية.
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  shrinkState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item: number) {
    this.list.splice(item, 1);
  }

  onAnimate() {
    this.state === 'normal'? this.state = 'highlighted': this.state = 'normal';
    this.shrinkState === 'normal'? this.shrinkState = 'highlighted': this.shrinkState = 'normal';

  }

  onShrink() {
    this.shrinkState = 'shrunken';
  }
}
