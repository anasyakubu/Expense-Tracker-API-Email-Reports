```md
# 💸 Expense Tracker API with Email Reports

A secure and scalable RESTful API built with **Node.js**, **TypeScript**, and **MongoDB** to help users track income and expenses. Users can also receive **automated email reports** via **AWS SES** and deploy the entire system on **AWS EC2**.
```

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based)
- ✅ Add, View, Delete Income & Expenses
- ✅ Categorize Transactions
- ✅ Send Monthly Expense Reports via Email
- ✅ HTML Email Templates using AWS SES
- ✅ Deployed on AWS EC2 (Ubuntu + PM2 + NGINX)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Atlas or Local)
- **Auth:** JWT + bcrypt
- **Cloud Services:**  
  - AWS SES (Send Email Reports)  
  - AWS EC2 (Host API)

---

## 📂 Folder Structure

```

.
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   ├── templates
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md

````

---

## 🔐 .env Configuration

```env
PORT=3000
MONGODB_URI=your_mongo_uri

JWT_SECRET=your_jwt_secret

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
SES_EMAIL_FROM=youremail@example.com
````

---

## 🛠 Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/anasyakubu/Expense-Tracker-API-Email-Reports.git

cd Expense-Tracker-API-Email-Reports

# Install dependencies
npm install

# Run in development
npm run dev
```

---

## 📬 Sending Email Reports

### `POST /reports/send`

Send a monthly report to the user’s email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Headers:**

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 📦 Deployment (AWS EC2)

1. Launch Ubuntu EC2 instance
2. SSH into instance
3. Install Node.js, Nginx, and PM2
4. Pull your code and configure `.env`
5. Run using PM2

```bash
pm2 start dist/index.js --name expense-api
pm2 save
```

---

## 📧 Email Integration (AWS SES)

* Verify your sender email/domain in AWS SES
* Attach IAM policy to allow `ses:SendEmail`
* Load HTML templates and send email reports from your route

---

## 🔐 Security Notes

* Always keep AWS credentials secret
* Use HTTPS in production
* Rate-limit report generation to avoid spam
* SES sandbox mode limits emails to verified users

---

## ✨ Future Improvements

* Schedule automatic reports (AWS Lambda + CloudWatch)
* CSV export of transactions
* Budget goal notifications
* Graph-based expense insights

---

## 🤝 Contributing

Pull requests are welcome! Please open issues for suggestions or bugs.

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Author

**Anas Yakubu**
[Portfolio](https://anasyakubu.netlify.app) | [GitHub](https://github.com/anasyakubu)

