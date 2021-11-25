import { EmotivStreamType, Headset } from ".";

export interface EmotivSession {
  id: string;
  status: "opened" | "activated" | "closed";
  owner: string;
  license: string;
  appId: string;
  started: string;
  stopped: string;
  streams: EmotivStreamType[];
  recordIds: string[];
  recording: boolean;
  headset: Headset;
}
