import { getConnectedHeadset } from "./peripherals";
import { send } from "./socket";
import { CreateSessionMessage, EmotivSession, Headset, MessageId, RequestMethod } from "./types";
import { getCortexToken, getCurrentProfile, queryProfiles } from "./user";

let session: EmotivSession;

export const getSession = (): EmotivSession => session;

export const createSession = (headsetId: Headset["id"]): void => {
  const cortexToken = getCortexToken();
  send({
    method: RequestMethod.CreateSession,
    id: MessageId.CreateSession,
    params: {
      cortexToken,
      headset: headsetId,
      status: "open",
    },
  });
};

/**
 * Proceeds flow and queries profiles and current profile
 */
export const onCreateSessionMessage = (message: CreateSessionMessage): void => {
  session = message.result;
  queryProfiles();
  const connectedHeadset = getConnectedHeadset();
  getCurrentProfile(connectedHeadset.id);
};
