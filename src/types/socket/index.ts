export enum MessageId {
  GetUserLogin = "getUserLogin",
  HasAccessRight = "hasAccessRight",
  RequestAccess = "requestAccess",
  Login = "login",
  AuthorizeWithoutLicense = "authorizeWithOutLicense",
  CreateSession = "createSession",
  GetCurrentProfile = "getCurrentProfile",
  QueryProfiles = "queryProfiles",
  LoadProfile = "loadProfile",
  UnloadProfile = "unloadProfile",
  ConnectHeadset = "connectHeadset",
  QueryHeadsets = "queryHeadsets",
  Subscribe = "subscribe",
  GetMentalCommandActiveAction = "getMentalCommandActiveAction",
  GetMentalCommandActionSensitivity = "getMentalCommandActionSensitivity",
  SetMentalCommandActionSensitivity = "setMentalCommandActionSensitivity",
}

export * from "./request";
export * from "./response";
