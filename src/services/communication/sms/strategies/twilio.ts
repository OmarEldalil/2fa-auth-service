import twilio, {Twilio as TwilioClient} from "twilio";

import {SMSCommunicationProviderInterface} from "../sms-provider-interface";
import {
    APP_ENV,
    DEFAULT_TO_TEST_SMS,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_VERIFY_SERVICE_SID
} from "../../../../config/app";

import {logger} from "../../../../utils/logger";
import {TwilioError} from "../../../../errors/twilio";

class Twilio implements SMSCommunicationProviderInterface {
    private client: TwilioClient;

    constructor() {
        this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }

    public async send(to: string, message: string): Promise<void> {
        try {
            await this.client.messages.create({
                to: (APP_ENV !== 'production') ? DEFAULT_TO_TEST_SMS : to,
                messagingServiceSid: TWILIO_VERIFY_SERVICE_SID,
                body: message,
            });

            logger.info(`Sending SMS: To=${to}, Body=${message}`);
        } catch (e) {
            logger.error(`Failed to send SMS: To=${to}, Body=${message}`, e);
            throw new TwilioError(`SMS sending failed: ${(e as Error).message}`);
        }
    }
}

export const twilioObj = new Twilio();