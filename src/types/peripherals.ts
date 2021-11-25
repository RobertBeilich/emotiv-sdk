export interface Headset {
  id: string;
  status: "discovered" | "connecting" | "connected";
  connectedBy: "bluetooth" | "dongle" | "usb cable" | "extender";
  dongle: string;
  firmware: string;
  motionSensors: string[];
  sensors: string[];
  settings: HeadsetSettings;
  flexMappings?: HeadsetFlexMapping;
  headbandPosition?: "back" | "top";
  customName: string;
}

export interface HeadsetSettings {
  mode: "EPOC" | "EPOCPLUS" | "EPOCFLEX";
  eegRate: number;
  eegRes: number;
  memsRate: number;
  memsRes: number;
}

export interface HeadsetFlexMapping {
  mappings: { [channel: string]: string };
}
