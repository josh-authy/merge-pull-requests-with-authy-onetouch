Merge Pull Request using Authy OneTouch
==============
Lomo squid austin, YOLO tilde unicorn slow-carb twee DIY banh mi vegan pickled. Typewriter 90's selvage mustache, chartreuse echo park cliche seitan swag put a bird on it four dollar toast. Asymmetrical 90's squid, waistcoat food truck narwhal locavore gluten-free occupy craft beer sustainable try-hard prism affogato.

Merge GitHub pull request using Authy OneTouch....

# Install

Requirements:
 - Node js
 - Sails js

Install Sails JS globally:

```
npm install sails
```

Clone this repo and run npm install:
```
git clone git@github.com:josh-authy/merge-pull-requests-with-authy-onetouch.git
cd merge-pull-requests-with-authy-onetouch
npm install
sails lift
```

Create a .env file to configure GitHub and Authy tokens, this file must not be added to git for your security.

GITHUB_OAUTH_TOKEN=XXXXYYYYYZZZ

AUTHY_USER_ID=1234567

AUTHY_API_KEY=XXXXXXXXXXXXXXXXXXXX

Use ngrok to expose the port 1337, and use the url generated to add this to Authy and github webhooks.

 - The path for github is https://YOURDOMAIN/pullrequestreceive
 - The path for authy is https://YOURDOMAIN/pullrequestapprove


# Deploy to heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


After deploy, edit enviroment vars:

![Alt text](assets/images/env.png?raw=true "Env Vars")
