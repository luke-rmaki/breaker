import { Resource } from "sst";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export async function send_email(to: string, subject: string, body: string) {
  const client = new SESv2Client();

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: Resource.BreakerEmail.sender,
      Destination: {
        ToAddresses: [to]
      },
      Content: {
        Simple: {
          Subject: { Data: subject },
          Body: { Text: { Data: body } }
        }
      }
    })
  );
}
