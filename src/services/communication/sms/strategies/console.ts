import {SMSCommunicationProviderInterface} from "../sms-provider-interface";

class Console implements SMSCommunicationProviderInterface {

  public async send(to: string, message: string): Promise<void> {
    console.log(`A message to ${to} with a body "${message}"`);
  }
}

export const consoleSms = new Console();
