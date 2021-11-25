import {
  ClientId,
  ClientSecret,
  CortexToken,
  Credentials,
  EmotivSession,
  EmotivStreamType,
  Headset,
  MentalCommandSensitivities,
  MessageId,
  Profile,
} from "..";

export enum RequestMethod {
  GetUserLogin = "getUserLogin",
  HasAccessRight = "hasAccessRight",
  RequestAccess = "requestAccess",
  Authorize = "authorize",
  CreateSession = "createSession",
  QueryHeadsets = "queryHeadsets",
  ControlDevice = "controlDevice",
  QueryProfiles = "queryProfile", // plural "s" is omitted by EMOTIV
  SetupProfile = "setupProfile",
  GetCurrentProfile = "getCurrentProfile",
  Subscribe = "subscribe",
  MentalCommandActiveAction = "mentalCommandActiveAction",
  MentalCommandActionSensitivity = "mentalCommandActionSensitivity",
}

export interface ConnectHeadsetRequest {
  method: RequestMethod.ControlDevice;
  id: MessageId.ConnectHeadset;
  params: {
    command: "connect";
    headset: Headset["id"];
  };
}

export interface MentalCommandActiveActionRequest {
  method: RequestMethod.MentalCommandActiveAction;
  id: MessageId.GetMentalCommandActiveAction;
  params: {
    cortexToken: Credentials["cortexToken"];
    session: EmotivSession["id"];
    status: "get";
  };
}

export interface GetMentalCommandActionSensitivityRequest {
  method: RequestMethod.MentalCommandActionSensitivity;
  id: MessageId.GetMentalCommandActionSensitivity;
  params: {
    cortexToken: CortexToken;
    session: EmotivSession["id"];
    status: "get";
  };
}

export interface SetMentalCommandActionSensitivityRequest {
  method: RequestMethod.MentalCommandActionSensitivity;
  id: MessageId.SetMentalCommandActionSensitivity;
  params: {
    cortexToken: CortexToken;
    session: EmotivSession["id"];
    status: "set";
    values: MentalCommandSensitivities;
  };
}

export interface SubscribeRequest {
  method: RequestMethod.Subscribe;
  id: MessageId.Subscribe;
  params: {
    cortexToken: CortexToken;
    session: EmotivSession["id"];
    streams: EmotivStreamType[];
  };
}

export interface LoadProfileRequest {
  method: RequestMethod.SetupProfile;
  id: MessageId.LoadProfile;
  params: {
    cortexToken: CortexToken;
    headset: Headset["id"];
    profile: Profile["name"];
    status: "load";
  };
}

export interface UnloadProfileRequest {
  method: RequestMethod.SetupProfile;
  id: MessageId.UnloadProfile;
  params: {
    cortexToken: CortexToken;
    headset: Headset["id"];
    profile: Profile["name"];
    status: "unload";
  };
}

export interface GetUserLoginRequest {
  method: RequestMethod.GetUserLogin;
  id: MessageId.GetUserLogin;
}

export interface QueryProfilesRequest {
  method: RequestMethod.QueryProfiles;
  id: MessageId.QueryProfiles;
  params: {
    cortexToken: CortexToken;
  };
}

export interface GetCurrentProfileRequest {
  method: RequestMethod.GetCurrentProfile;
  id: MessageId.GetCurrentProfile;
  params: {
    cortexToken: CortexToken;
    headset: Headset["id"];
  };
}

export interface HasAccessRightRequest {
  method: RequestMethod.HasAccessRight;
  id: MessageId.HasAccessRight;
  params: {
    clientId: ClientId;
    clientSecret: ClientSecret;
  };
}

export interface QueryHeadsetsRequest {
  method: RequestMethod.QueryHeadsets;
  id: MessageId.QueryHeadsets;
}

export interface AuthorizeWithoutLicenseRequest {
  method: RequestMethod.Authorize;
  id: MessageId.AuthorizeWithoutLicense;
  params: {
    clientId: ClientId;
    clientSecret: ClientSecret;
    debit: 1;
  };
}

export interface RequestAccessRequest {
  method: RequestMethod.RequestAccess;
  id: MessageId.RequestAccess;
  params: {
    clientId: ClientId;
    clientSecret: ClientSecret;
  };
}

export interface CreateSessionRequest {
  method: RequestMethod.CreateSession;
  id: MessageId.CreateSession;
  params: {
    cortexToken: CortexToken;
    headset: Headset["id"];
    status: "open";
  };
}

export interface BaseRequest {
  method: RequestMethod;
  id: MessageId;
}

export type EmotivRequest = BaseRequest &
  (
    | ConnectHeadsetRequest
    | SubscribeRequest
    | QueryProfilesRequest
    | LoadProfileRequest
    | UnloadProfileRequest
    | GetCurrentProfileRequest
    | GetUserLoginRequest
    | HasAccessRightRequest
    | RequestAccessRequest
    | QueryHeadsetsRequest
    | AuthorizeWithoutLicenseRequest
    | CreateSessionRequest
    | MentalCommandActiveActionRequest
    | GetMentalCommandActionSensitivityRequest
    | SetMentalCommandActionSensitivityRequest
  );
