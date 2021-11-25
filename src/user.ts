import { getMentalCommandActiveAction } from "./mentalCommands";
import { getConnectedHeadset } from "./peripherals";
import { send } from "./socket";
import {
  AuthorizeWithoutLicenseMessage,
  Callbacks,
  ClientId,
  ClientSecret,
  CortexToken,
  Credentials,
  GetCurrentProfileMessage,
  HasAccessRightMessage,
  Headset,
  LoadProfileMessage,
  MessageId,
  Profile,
  QueryProfilesMessage,
  RequestMethod,
} from "./types";

const credentials: Credentials = {};

let profiles: Profile[];
let currentProfile: Profile;

export const getCortexToken = (): CortexToken => credentials.cortexToken!;
export const getClientId = (): ClientId => credentials.clientId!;
export const getClientSecret = (): ClientSecret => credentials.clientSecret!;

export const getProfiles = (): Profile[] => profiles;

export const setClientId = (clientId: Credentials["clientId"]): void => {
  credentials.clientId = clientId;
};

export const setClientSecret = (clientSecret: Credentials["clientSecret"]): void => {
  credentials.clientSecret = clientSecret;
};

export const setCortexToken = (cortexToken: Credentials["cortexToken"]): void => {
  credentials.cortexToken = cortexToken;
};

export const requestAccess = (): void => {
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  send({
    method: RequestMethod.RequestAccess,
    id: MessageId.RequestAccess,
    params: {
      clientId,
      clientSecret,
    },
  });
};

export const hasAccessRight = (): void => {
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  send({
    method: RequestMethod.HasAccessRight,
    id: MessageId.HasAccessRight,
    params: {
      clientId,
      clientSecret,
    },
  });
};

export const authorizeWithOutLicense = (): void => {
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  send({
    method: RequestMethod.Authorize,
    id: MessageId.AuthorizeWithoutLicense,
    params: {
      clientId,
      clientSecret,
      debit: 1,
    },
  });
};

/**
 * Unloads current profile and loads given profile, if not matching
 * @throws unknown profile
 */
export const loadProfile = (newProfile: Profile["name"], headsetId?: Headset["id"]): void => {
  const cortexToken = getCortexToken();
  const profiles = getProfiles().map((profile) => profile.name);
  if (!profiles.includes(newProfile)) {
    throw new Error(`Unknown profile ${newProfile}.`);
  }
  if (currentProfile) {
    if (currentProfile.name === newProfile) return;
    unloadProfile(currentProfile.name, headsetId);
  }
  send({
    method: RequestMethod.SetupProfile,
    id: MessageId.LoadProfile,
    params: {
      cortexToken,
      headset: headsetId || getConnectedHeadset().id,
      profile: newProfile,
      status: "load",
    },
  });
};

export const unloadProfile = (profile: Profile["name"], headsetId?: Headset["id"]): void => {
  const cortexToken = getCortexToken();
  send({
    method: RequestMethod.SetupProfile,
    id: MessageId.UnloadProfile,
    params: {
      cortexToken,
      headset: headsetId || getConnectedHeadset().id,
      profile,
      status: "unload",
    },
  });
};

export const getUserLogin = (): void => {
  send({
    method: RequestMethod.GetUserLogin,
    id: MessageId.GetUserLogin,
  });
};

export const queryProfiles = (): void => {
  const cortexToken = getCortexToken();
  send({
    method: RequestMethod.QueryProfiles,
    id: MessageId.QueryProfiles,
    params: {
      cortexToken,
    },
  });
};

/**
 * Gets current profile for given headset
 * @throws unknown headset id
 */
export const getCurrentProfile = (headsetId: Headset["id"]): void => {
  const cortexToken = getCortexToken();
  send({
    method: RequestMethod.GetCurrentProfile,
    id: MessageId.GetCurrentProfile,
    params: {
      cortexToken,
      headset: headsetId,
    },
  });
};

export const onGetUserLoginMessage = (): void => {
  hasAccessRight();
};

/**
 * Proceeds flow
 * If access granted authorizes without license
 * If not requests access
 */
export const onHasAccessRightMessage = (
  message: HasAccessRightMessage,
  setHasAccessRight?: Callbacks["setHasAccessRight"]
): void => {
  const { accessGranted } = message.result;
  if (setHasAccessRight) setHasAccessRight(accessGranted);
  if (accessGranted) {
    authorizeWithOutLicense();
  } else {
    requestAccess();
  }
};

/**
 * Proceeds flow and checks for access right
 */
export const onRequestAccessMessage = (): void => {
  hasAccessRight();
};

/**
 * Proceeds flow and queries headsets
 * Sets cortex token
 */
export const onAuthorizeWithOutLicenseMessage = (message: AuthorizeWithoutLicenseMessage): void => {
  setCortexToken(message.result.cortexToken);
  send({
    method: RequestMethod.QueryHeadsets,
    id: MessageId.QueryHeadsets,
  });
};

export const onQueryProfileMessage = (message: QueryProfilesMessage, setProfiles: Callbacks["setProfiles"]): void => {
  profiles = message.result;
  if (setProfiles) setProfiles(profiles);
};

export const onGetCurrentProfileMessage = (
  message: GetCurrentProfileMessage,
  setCurrentProfile: Callbacks["setCurrentProfile"]
): void => {
  currentProfile = message.result;
  if (setCurrentProfile) setCurrentProfile(currentProfile);
};

/**
 * Proceeds flow and gets active commands for session
 */
export const onLoadProfileMessage = (
  message: LoadProfileMessage,
  setCurrentProfile: Callbacks["setCurrentProfile"]
): void => {
  currentProfile = message.result;
  if (setCurrentProfile) setCurrentProfile(currentProfile);
  getMentalCommandActiveAction();
};
