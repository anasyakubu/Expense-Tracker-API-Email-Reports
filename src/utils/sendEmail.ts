import AWS from 'aws-sdk';

const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const params = {
    Source: process.env.SES_EMAIL_FROM!,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: html,
        },
      },
    },
  };

  return ses.sendEmail(params).promise();
};
