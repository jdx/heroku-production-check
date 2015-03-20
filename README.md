heroku-production-check plug-in
===============================

The heroku-production-check plug-in ensures your app has the proper setup suitable for scaling an app and ensuring it is ready for a [production workload on Heroku](https://devcenter.heroku.com/articles/production-check). The plug-in adds the functionality of production check which is available in the Heroku dashboard directly within your CLI.

### Installation

Simply run:

    heroku plugins:install heroku-production-check
    
### Usage

Once installed, you'll have a new command under the apps namespace within the Heroku CLI. To run production check and get a report card for your app:

    heroku apps:status -a app-name-here 

Checks an app for various production-ready checks.

Usage:

```
$ heroku plugins:install heroku-production-check
$ heroku apps:status -a APPNAME
```
