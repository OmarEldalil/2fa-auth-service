import {SMSCommunicationProviderInterface} from "./sms/sms-provider-interface";
import strategies from "./sms/strategies";
import {CommunicationProviders, DEFAULT_SMS_PROVIDER} from "../../constants/communication";

class SmsCommunicationService {
    private provider: SMSCommunicationProviderInterface;

    constructor() {
        this.provider = strategies[DEFAULT_SMS_PROVIDER];
    }

    public async send(to: string, message: string): Promise<void> {
        return this.provider.send(to, message);
    }

    public setProvider(provider: CommunicationProviders): this {
        this.provider = strategies[provider];
        return this;
    }
}

export const smsCommunicationService = new SmsCommunicationService();