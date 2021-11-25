import { initializeEmotivApi, Callbacks, Headset, MentalCommandAction, Profile, LogLevel } from "emotiv-sdk";

const clientId = "<your client id>";
const clientSecret = "<your client seceret>";
const logLevel = LogLevel.Error;

// eslint-disable-next-line no-console
const logging = (input: unknown): void => console.log("logging", input);

const callbacks: Callbacks = {
  setHeadsets: (headsets: Headset[]) => {
    logging({ headsets });
    api.connectHeadset(headsets[0].id);
  },
  setProfiles: (profiles: Profile[]) => {
    logging({ profiles });
    api.loadProfile(profiles[0].name);
  },
  setCurrentCommand: (command: MentalCommandAction, power: number) => logging({ command, power }),
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const api = initializeEmotivApi({ clientId, clientSecret, logLevel, callbacks });
api.connect();
