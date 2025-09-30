### Configure Server:

!First, download and install the [MongoDB Community Server](https://www.mongodb.com/try/download/community)
(skip if already installed).

Go to the project directory

```bash
  cd ojt-netkrom-backend-master
```

copy .env from .env.example (set custom JWT token, user email, and Gmail app password).

```bash
  cp .env.example .env
```

set your costum token

```bash
  JWT_SECRET=your-jwt-secret-key
```

#### Note: Gmail app password (optional, for contact form feature).

To generate a Gmail App Password:

- you must first [enable 2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification) in your Google Account
- then go to your [Google App Passwords page](https://myaccount.google.com/apppasswords),
- specify the app name and click the **Create** button
- copy the generated 16-character password and use it in your third-party application.

add the copied app password to your environment variable.

```bash
GMAIL_APP_PASSWORD=your-app-password-without-space
```

set gmail user for authentication and sender info, along with the receiver for sending emails.

```bash
GMAIL_USER=your-email-user
GMAIL_RECEIVER=your-email-receiver
```

#### Continue

Install dependencies

```bash
  npm install
```

run this command to seed the admin account (username: admin, password: admin)

```bash
  npm run seed:admin
```

Start the server

```bash
  npm run dev
```

## Here to Contribute ✨

Contributions are always welcome!   
[Frontend](https://github.com/gemadp01/ojt-netkrom-frontend)

## Authors

- [@gemadp01](https://www.github.com/gemadp01)
