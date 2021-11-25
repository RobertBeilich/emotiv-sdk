import { EmotivStreamType } from ".";

export enum MentalCommandAction {
  Neutral = "neutral",
  Push = "push",
  Pull = "pull",
  Lift = "lift",
  Drop = "drop",
  Left = "left",
  Right = "right",
  RotateLeft = "rotateLeft",
  RotateRight = "rotateRight",
  RotateCounterClockwise = "rotateCounterClockwise",
  RotateClockwise = "rotateClockwise",
  RotateForwards = "rotateForwards",
  RotateReverse = "rotateReverse",
  Disappear = "disappear",
}

export type MentalCommandSensitivities = [sen1: number, sen2: number, sen3: number, sen4: number];
export type MentalCommandPower = number;
export type MentalCommandCols = [MentalCommandAction, MentalCommandPower];

export interface MentalCommandStreamInfo {
  streamName: EmotivStreamType.MentalCommands;
  cols: ["act", "pow"];
  sid: string;
}
