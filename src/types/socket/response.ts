import {
  CortexToken,
  EmotivSession,
  EmotivStreamInfo,
  Headset,
  MentalCommandAction,
  MentalCommandSensitivities,
  MessageId,
  Profile,
  StreamData,
  StreamFailureInfo,
} from "..";

export enum WarningCode {
  HeadsetConnected = 104,
}

export interface HeadsetConnectedWarning {
  code: WarningCode.HeadsetConnected;
  message: {
    headsetId: Headset["id"];
    behavior: string;
  };
}

export interface BaseWarning {
  code: number;
  message: string | Record<string, unknown>;
}

export type Warning = BaseWarning & HeadsetConnectedWarning;

export interface EmotivError {
  code: number;
}

export interface BaseMessage {
  id: string;
  jsonrpc: "2.0";
  warning?: Warning;
  error?: EmotivError;
}

export interface GetUserLoginMessage {
  id: MessageId.GetUserLogin;
  result: [
    {
      username: string;
      currentOSUId: string;
      currentOSUsername: string;
      loggedInOSUId: string;
      loggedInOSUsername: string;
      lastLoginTime: string;
    }
  ];
}

export interface RequestAccessMessage {
  id: MessageId.RequestAccess;
  result: {
    accessGranted: boolean;
    message: string;
  };
}

export interface HasAccessRightMessage {
  id: MessageId.HasAccessRight;
  result: {
    accessGranted: boolean;
    message: string;
  };
}

export interface AuthorizeWithoutLicenseMessage {
  id: MessageId.AuthorizeWithoutLicense;
  result: {
    cortexToken: CortexToken;
    warning?: Warning & {
      licenseUrl: string;
    };
  };
}

export interface QueryHeadsetMessage {
  id: MessageId.QueryHeadsets;
  result: Headset[];
}

export interface ConnectHeadsetMessage {
  id: MessageId.ConnectHeadset;
  result: {
    command: "conenct";
    message: string;
  };
}

export interface CreateSessionMessage {
  id: MessageId.CreateSession;
  result: EmotivSession;
}

export interface GetCurrentProfileMessage {
  id: MessageId.GetCurrentProfile;
  result: {
    name: string;
    loadedByThisApp: boolean;
  };
}

export interface QueryProfilesMessage {
  id: MessageId.QueryProfiles;
  result: Profile[];
}

export interface LoadProfileMessage {
  id: MessageId.LoadProfile;
  result: {
    action: "load";
    name: string;
    message: string;
  };
}

export interface SubscribeMessage {
  id: MessageId.Subscribe;
  result: {
    success: EmotivStreamInfo[];
    failure: StreamFailureInfo[];
  };
}

export interface GetMentalCommandActiveActionMessage {
  id: MessageId.GetMentalCommandActiveAction;
  result: MentalCommandAction[];
}

export interface GetMentalCommandActionSensitivityMessage {
  id: MessageId.GetMentalCommandActionSensitivity;
  result: MentalCommandSensitivities;
}

export interface SetMentalCommandActionSensitivityMessage {
  id: MessageId.SetMentalCommandActionSensitivity;
  result: "success";
}

export type EmotivMessage =
  | (BaseMessage &
      (
        | GetUserLoginMessage
        | RequestAccessMessage
        | HasAccessRightMessage
        | AuthorizeWithoutLicenseMessage
        | QueryHeadsetMessage
        | ConnectHeadsetMessage
        | CreateSessionMessage
        | GetCurrentProfileMessage
        | QueryProfilesMessage
        | LoadProfileMessage
        | SubscribeMessage
        | GetMentalCommandActiveActionMessage
        | GetMentalCommandActionSensitivityMessage
        | SetMentalCommandActionSensitivityMessage
      ))
  | StreamData;
