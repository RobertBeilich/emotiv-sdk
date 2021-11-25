import _ from "lodash";
import ws from "ws";
import { onGetMentalCommandActionSensitivityMessage, onGetMentalCommandActiveActionMessage } from "./mentalCommands";
import { onConnectHeadsetMessage, onConnectedHeadsetWarning, onQueryHeadsetsMessage } from "./peripherals";
import { onCreateSessionMessage } from "./session";
import { onStreamData } from "./stream";
import { Callbacks, EmotivMessage, EmotivRequest, isStreamData, LogLevel, MessageId, WarningCode } from "./types";
import {
  getUserLogin,
  onAuthorizeWithOutLicenseMessage,
  onGetCurrentProfileMessage,
  onGetUserLoginMessage,
  onHasAccessRightMessage,
  onLoadProfileMessage,
  onQueryProfileMessage,
  onRequestAccessMessage,
} from "./user";

const DEFAULT_URI = "wss://127.0.0.1:6868/";
let socket: WebSocket | ws.WebSocket;

/**
 * Connects to Emotiv and initializes callbacks and execution flow
 */
export const connect = (getLogLevel: () => LogLevel, socketURI?: string, callbacks?: Callbacks): void => {
  // browser implementation
  if (typeof window !== "undefined") {
    socket = new WebSocket(socketURI || DEFAULT_URI);
    // nodejs implementation
  } else {
    socket = new ws.WebSocket(socketURI || DEFAULT_URI);
  }

  socket.onopen = (): void => {
    getUserLogin();
  };

  socket.onmessage = onmessage(getLogLevel, callbacks);
};

export const send = (request: EmotivRequest): void => {
  if (!socket) throw new Error("Not yet connected.");
  socket.send(
    JSON.stringify({
      jsonrpc: "2.0",
      ...request,
    })
  );
};

const onmessage =
  (getLogLevel: () => LogLevel, callbacks?: Callbacks) =>
  (event: MessageEvent): void => {
    const data = event.data as unknown as string;
    const message: EmotivMessage = JSON.parse(data);

    const {
      setHasAccessRight = _.noop,
      setProfiles = _.noop,
      setCurrentProfile = _.noop,
      setHeadsets = _.noop,
      setConnectedHeadset = _.noop,
      setActiveCommands = _.noop,
      setCommandSensitivities = _.noop,
      setCurrentCommand = _.noop,
    } = callbacks || {};

    // eslint-disable-next-line no-console
    if (getLogLevel() <= LogLevel.Debug) console.debug({ message });

    if (isStreamData(message)) {
      onStreamData(message, setCurrentCommand);
      return;
    }

    if (message.warning) {
      const warning = message.warning;
      switch (warning.code) {
        case WarningCode.HeadsetConnected: {
          onConnectedHeadsetWarning(warning, setConnectedHeadset);
          break;
        }
        default: {
          onWarning(message, getLogLevel);
        }
      }
    }
    if (message.error) {
      onError(message, getLogLevel);
      return;
    }
    switch (message.id) {
      case MessageId.GetUserLogin: {
        onGetUserLoginMessage();
        break;
      }
      case MessageId.HasAccessRight: {
        onHasAccessRightMessage(message, setHasAccessRight);
        break;
      }
      case MessageId.RequestAccess: {
        onRequestAccessMessage();
        break;
      }
      case MessageId.AuthorizeWithoutLicense: {
        onAuthorizeWithOutLicenseMessage(message);
        break;
      }
      case MessageId.QueryHeadsets: {
        onQueryHeadsetsMessage(message, setHeadsets);
        break;
      }
      case MessageId.ConnectHeadset: {
        onConnectHeadsetMessage(setConnectedHeadset);
        break;
      }
      case MessageId.CreateSession: {
        onCreateSessionMessage(message);
        break;
      }
      case MessageId.GetCurrentProfile: {
        onGetCurrentProfileMessage(message, setCurrentProfile);
        break;
      }
      case MessageId.QueryProfiles: {
        onQueryProfileMessage(message, setProfiles);
        break;
      }
      case MessageId.LoadProfile: {
        onLoadProfileMessage(message, setCurrentProfile);
        break;
      }
      case MessageId.Subscribe: {
        // do nothing on purpose (do not fallthrough to default error handling)
        break;
      }
      case MessageId.GetMentalCommandActiveAction: {
        onGetMentalCommandActiveActionMessage(message, setActiveCommands);
        break;
      }
      case MessageId.GetMentalCommandActionSensitivity: {
        onGetMentalCommandActionSensitivityMessage(message, setCommandSensitivities);
        break;
      }
      case MessageId.SetMentalCommandActionSensitivity: {
        // do nothing on purpose (do not fallthrough to default error handling)
        break;
      }
      default: {
        // eslint-disable-next-line no-console
        if (getLogLevel() <= LogLevel.Error) console.error(`Unhandled message id ${message.id}`);
      }
    }
  };

const onWarning = (msg: EmotivMessage, getLogLevel: () => LogLevel): void => {
  // eslint-disable-next-line no-console
  if (getLogLevel() <= LogLevel.Warning) console.warn({ msg });
};

const onError = (msg: EmotivMessage, getLogLevel: () => LogLevel): void => {
  // eslint-disable-next-line no-console
  if (getLogLevel() <= LogLevel.Error) console.error({ msg });
};
