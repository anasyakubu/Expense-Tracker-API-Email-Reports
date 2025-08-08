import AWS from 'aws-sdk';

const ses = new AWS.SES({
  region: process.env.AWS_REGION as string,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
});

class SendEmail {

  constructor(public to: string, public subject: string, public html: string) { }

  public async send() {

    const params = {

      Source: process.env.SES_EMAIL_FROM!,
      Destination: { ToAddresses: [this.to], }, // distination of the email
      Message: {
        Subject: { Data: this.subject, }, // sunject of the email
        Body: {
          Html: { Data: this.html, },
        },
      },
    };

    return ses.sendEmail(params).promise();
  }
}


export default SendEmail;
