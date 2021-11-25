import { getSession } from "./session";
import { send } from "./socket";
import { Callbacks, EmotivStreamType, isCommandStream, MessageId, RequestMethod, StreamData } from "./types";
import { getCortexToken } from "./user";

export const subscribe = (streams: EmotivStreamType[]): void => {
  const cortexToken = getCortexToken();
  const session = getSession();
  send({
    method: RequestMethod.Subscribe,
    id: MessageId.Subscribe,
    params: {
      cortexToken,
      session: session.id,
      streams,
    },
  });
};

export const onStreamData = (data: StreamData, setCurrentCommand: Callbacks["setCurrentCommand"]): void => {
  if (isCommandStream(data)) {
    if (setCurrentCommand) setCurrentCommand(...data.com);
  }
};
