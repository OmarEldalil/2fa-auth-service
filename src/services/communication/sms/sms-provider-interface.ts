export interface SMSCommunicationProviderInterface {
    send(to: string, message: string): Promise<void>;
}