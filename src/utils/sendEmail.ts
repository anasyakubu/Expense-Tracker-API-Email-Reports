import AWS from 'aws-sdk';

const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

class SendEmail {

  constructor(public to: string, public subject: string, public html: string) { }

  public async send() {
    const params = {
      Source: process.env.SES_EMAIL_FROM!,
      Destination: { ToAddresses: [this.to], },
      Message: {
        Subject: { Data: this.subject, },
        Body: {
          Html: { Data: this.html, },
        },
      },
    };

    return ses.sendEmail(params).promise();
  }
}


export default SendEmail;
