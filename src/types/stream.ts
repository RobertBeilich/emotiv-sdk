import _ from "lodash";
import { EmotivMessage, EmotivSession, MentalCommandCols, MentalCommandStreamInfo } from ".";

export enum EmotivStreamType {
  Eeg = "eeg",
  Motion = "mot",
  Device = "dev",
  EegQuality = "eq",
  EegPower = "pow",
  PerformanceMetrics = "met",
  MentalCommands = "com",
  FacialExpression = "fac",
  SystemEvents = "sys",
}

export type EmotivStreamInfo = MentalCommandStreamInfo;

export interface StreamFailureInfo {
  streamName: EmotivStreamType;
  code: number;
  message: string;
}

export interface MentalCommandStream {
  com: MentalCommandCols;
}

export interface EmotivStream {
  sid: EmotivSession["id"];
  time: number;
}

export type StreamData = EmotivStream & MentalCommandStream;

export const isStreamData = (message: EmotivMessage): message is StreamData => {
  const casted = message as StreamData;
  return !_.isNil(casted.sid) && !_.isNil(casted.time);
};

export const isCommandStream = (data: StreamData): data is EmotivStream & MentalCommandStream => {
  const casted = data as MentalCommandStream;
  return !_.isNil(casted.com);
};
