# integratingfactor.github.io
This is a sample implementation to demonstrate simplicity of using Integratingfactor.com's AAA as as service from github pages for basic user authentication. This experience is available at https://integratingfactor.github.io, which is a github pages site.

For more details about oAuth API and functionality available to developers, please refer to [wiki](https://github.com/Integratingfactor/integratingfactor.github.io/wiki/IDP-API-:-oAuth2).

# Development Steps
### Install
* clone repo: `$ git clone git@github.com:Integratingfactor/integratingfactor.github.io.git`
* change directory: `$ cd integratingfactor.github.io/gulp`
* install gulp globally _(needed one time only, if not done before)_: `$ npm install --global gulp`
* install local npm dependencies: `$ npm install`  
_Refer to [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions), if you are seeing EACCES or permissions errors._

### Run
* start gulp: `$ gulp`
* leave the terminal running with gulp

### Develop
* with gulp running already, start a new terminal
* change directory to source : `$ cd integratingfactor.github.io/src`
* make changes to a .html, .js, or .scss file
* gulp should watch and automatically rebuild
* browser should reload to see changes automatically
