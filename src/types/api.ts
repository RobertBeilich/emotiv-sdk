import { getMentalCommandActionSensitivity, setMentalCommandActionSensitivity } from "../mentalCommands";
import { loadProfile } from "../user";
import { Headset, MentalCommandAction, MentalCommandSensitivities, Profile } from ".";

export interface Callbacks {
  setHasAccessRight?: (hasAccessRight: boolean) => void;
  setHeadsets?: (headsets: Headset[]) => void;
  setConnectedHeadset?: (headset?: Headset) => void;
  setProfiles?: (profiles: Profile[]) => void;
  setCurrentProfile?: (profile: Profile | null) => void;
  setActiveCommands?: (commands: MentalCommandAction[]) => void;
  setCommandSensitivities?: (sensitivities: MentalCommandSensitivities) => void;
  setCurrentCommand?: (command: MentalCommandAction, power: number) => void;
}

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  None = 4,
}

export interface InitData {
  clientId: string;
  clientSecret: string;
  logLevel?: LogLevel;
  callbacks?: Callbacks;
}

export interface EmotivApi {
  connect: (socketURI?: string) => void;
  connectHeadset: (id: Headset["id"]) => void;
  loadProfile: typeof loadProfile;
  getMentalCommandActionSensitivity: typeof getMentalCommandActionSensitivity;
  setMentalCommandActionSensitivity: typeof setMentalCommandActionSensitivity;
  changeLogLevel: (level: LogLevel) => void;
}
