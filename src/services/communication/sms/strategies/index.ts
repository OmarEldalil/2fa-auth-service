import {CommunicationProviders} from "../../../../constants/communication";
import {twilioObj} from "./twilio";
import {consoleSms} from "./console";

export default {
  [CommunicationProviders.Twilio]: twilioObj,
  [CommunicationProviders.Console]: consoleSms,
};
