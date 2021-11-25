import { getSession } from "./session";
import { send } from "./socket";
import { subscribe } from "./stream";
import {
  Callbacks,
  EmotivStreamType,
  GetMentalCommandActionSensitivityMessage,
  GetMentalCommandActiveActionMessage,
  MentalCommandSensitivities,
  MessageId,
  RequestMethod,
} from "./types";
import { getCortexToken } from "./user";

export const getMentalCommandActiveAction = (): void => {
  const cortexToken = getCortexToken();
  const session = getSession();
  send({
    method: RequestMethod.MentalCommandActiveAction,
    id: MessageId.GetMentalCommandActiveAction,
    params: {
      cortexToken,
      session: session.id,
      status: "get",
    },
  });
};

export const getMentalCommandActionSensitivity = (): void => {
  const cortexToken = getCortexToken();
  const session = getSession();
  send({
    method: RequestMethod.MentalCommandActionSensitivity,
    id: MessageId.GetMentalCommandActionSensitivity,
    params: {
      cortexToken,
      session: session.id,
      status: "get",
    },
  });
};

export const setMentalCommandActionSensitivity = (sensitivities: MentalCommandSensitivities): void => {
  const cortexToken = getCortexToken();
  const session = getSession();
  send({
    method: RequestMethod.MentalCommandActionSensitivity,
    id: MessageId.SetMentalCommandActionSensitivity,
    params: {
      cortexToken,
      session: session.id,
      status: "set",
      values: sensitivities,
    },
  });
};

/**
 * Proceeds flow and subscribes to "com" stream
 */
export const onGetMentalCommandActiveActionMessage = (
  message: GetMentalCommandActiveActionMessage,
  setActiveCommands: Callbacks["setActiveCommands"]
): void => {
  if (setActiveCommands) setActiveCommands(message.result);
  subscribe([EmotivStreamType.MentalCommands]);
};

export const onGetMentalCommandActionSensitivityMessage = (
  message: GetMentalCommandActionSensitivityMessage,
  setCommandSensitivities: Callbacks["setCommandSensitivities"]
): void => {
  if (setCommandSensitivities) setCommandSensitivities(message.result);
};
