export enum CommunicationProviders {
    Twilio = "Twilio",
    Console = "Console",
}

export const DEFAULT_SMS_PROVIDER = CommunicationProviders.Console;

export const OTPMessage  = (otp: string) => {
    return `Your One time password is ${otp}`;
}