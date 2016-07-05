'use strict';
import {TapeMachine} from "./hello";

const tp = new TapeMachine();
tp.record("Hello... Hellooooo!!!");
tp.play();
// => Hello... Hellooooo!!! Helloooooo!!!!!
