import { getMentalCommandActionSensitivity, setMentalCommandActionSensitivity } from "./mentalCommands";
import { connectHeadset } from "./peripherals";
import { connect } from "./socket";
import { EmotivApi, Headset, InitData, LogLevel } from "./types";
import { loadProfile, setClientId, setClientSecret } from "./user";

export const initializeEmotivApi = ({ clientId, clientSecret, logLevel, callbacks }: InitData): EmotivApi => {
  let _logLevel: LogLevel = logLevel || LogLevel.Error;

  const changeLogLevel = (level: LogLevel): void => {
    _logLevel = level;
  };

  const getLogLevel = (): LogLevel => _logLevel;

  setClientId(clientId);
  setClientSecret(clientSecret);

  return {
    connect: (socketURI?: string): void => connect(getLogLevel, socketURI, callbacks),
    connectHeadset: (id: Headset["id"]): void => connectHeadset(id),
    loadProfile,
    getMentalCommandActionSensitivity,
    setMentalCommandActionSensitivity,
    changeLogLevel,
  };
};

export * from "./types";
