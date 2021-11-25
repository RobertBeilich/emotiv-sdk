import { createSession } from "./session";
import { send } from "./socket";
import { Callbacks, Headset, HeadsetConnectedWarning, MessageId, QueryHeadsetMessage, RequestMethod } from "./types";

let headsets: Headset[] = [];
let headsetToConnect: Headset | undefined;
let connectedHeadset: Headset;

export const getConnectedHeadset = (): Headset => connectedHeadset;

/**
 * Connects to headset with given id
 * @throws unknown headset id
 */
export const connectHeadset = (id: Headset["id"]): void => {
  const headset = headsets.find((headset) => headset.id === id);
  if (!headset) throw new Error(`Unknown headset id: ${id}.`);
  headsetToConnect = headset;
  send({
    method: RequestMethod.ControlDevice,
    id: MessageId.ConnectHeadset,
    params: {
      command: "connect",
      headset: headset.id,
    },
  });
};

export const onQueryHeadsetsMessage = (message: QueryHeadsetMessage, setHeadsets: Callbacks["setHeadsets"]): void => {
  headsets = message.result;
  if (setHeadsets) setHeadsets(headsets);
};

/**
 * Proceeds flow and creates session
 */
export const onConnectHeadsetMessage = (setConnectedHeadset: Callbacks["setConnectedHeadset"]): void => {
  // could set headset status to connecting, but socket return message is fulltext
  if (!headsetToConnect) throw new Error("Unexpected call.");
  connectedHeadset = headsetToConnect;
  headsetToConnect = undefined;
  if (setConnectedHeadset) setConnectedHeadset(connectedHeadset);
  createSession(connectedHeadset.id);
  return;
};

/**
 * According to API should get used for checking connection established, but is never called
 */
export const onConnectedHeadsetWarning = (
  warning: HeadsetConnectedWarning,
  setConnectedHeadset: Callbacks["setConnectedHeadset"]
): void => {
  const headsetId = warning.message.headsetId;
  connectedHeadset = headsets.find((headset) => headset.id === headsetId)!;
  if (setConnectedHeadset) setConnectedHeadset(connectedHeadset);
  createSession(headsetId);
};
