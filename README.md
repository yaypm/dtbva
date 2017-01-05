![](https://s3.amazonaws.com/dynatrace-davis/assets/images/dynatrace-davis-logo.png)

Welcome to Davis!  Davis provides several new, cutting edge mediums for interacting with Dynatrace.  Currently integration with Slack and Amazon Alexa are officially supported but more could be added in the future.

We've tried to make the process of setting up and configuring Davis as simple as possible.  However, feel free to open an issue or <a href="mailto:davis@dynatrace.com">email</a> if any questions or feedback. For more information and documentation, make sure to check out [the wiki](https://github.com/Dynatrace/davis-server/wiki) or click on one of the following links

# Requirements

- NodeJS version 6
- NPM
- MongoDB

# Getting Started

```bash
git clone https://github.com/Dynatrace/davis-bootstrap.git davis
cd davis
npm install
NODE_ENV=production node index.js
```

Note that in order to use Davis with Amazon Alexa Voice Service or with Slack http must be enabled using a fully qualified domain name. Follow the [instructions on the wiki](https://github.com/Dynatrace/davis-server/wiki/Getting%20Started#custom-deployment) instructions on the wiki to get started.

# Running as a Service

In order to have Davis continue to run when your session ends you will need to configure davis to run as a service.
One way to do this is to use [forever-service](https://github.com/zapty/forever-service) similar to the following:

```bash
npm install -g forever
npm install -g forever-service
forever-service install davis -s index.js -e "NODE_ENV=production"
service davis start
```

## Disclaimer
This software is experimental and currently NOT SUPPORTED by Dynatrace.
Please use at your own risk. You can contact the author via Github issues.

## License
Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
