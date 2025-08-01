export enum CommunicationProviders {
    Twilio = "Twilio",
    Console = "Console",
}

export const OTPMessage  = (otp: string) => {
    return `Your One time password is ${otp}`;
}