import {User} from "../models/user";
import {generateOTP} from "./otp-service";
import {smsCommunicationService} from "./communication/sms-communication-service";
import {OTPMessage} from "../constants/communication";

export const handle2FAGenerationAndCommunication = async (user: User): Promise<void> => {
    const otp = await generateOTP(user.id);

    await smsCommunicationService.send(user.phone, OTPMessage(otp))
}