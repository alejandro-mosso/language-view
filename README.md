#Environment set up
https://material.angular.io/guide/getting-started

<ul>
    <li>If Docker service is not started, run below commands:
        <br/><code><b>$</b> sudo service docker start</code>
        <br/><code><b>$</b> sudo service docker status</code>
    </li>
    <li>Run following commands under language-services:
        <br/><code><b>$</b> docker-compose build</code>
        <br/><code><b>$</b> docker-compose up</code>
    </li>
</ul>

#Angular project creation
<ul>
    <li>Under language-view directory run:
    <br/><code><b>$</b> ng new app --style=scss</code>
    <br/><code><b>$</b> cd app</code>
    <br/><code><b>$</b> ng add @angular/material</code>
    <br/><code><b>$</b> npm install recordrtc --save</code>
    <br/><code><b>$</b> npm install webrtc-adapter --save</code>
    <br/><code><b>$</b> ng generate module material</code>
    <br/><code><b>$</b> ng generate class model/i-media --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class model/translate --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class model/youglish --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class model/dictionary --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class model/audio --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class model/history-menu --skipTests=true --type=model</code>
    <br/><code><b>$</b> ng generate class service/rest-client --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/youglish --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/translate --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/dictionary --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/audio --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/history-menu --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate class service/i-module --skipTests=true --type=service</code>
    <br/><code><b>$</b> ng generate pipe pipe/file-size --skipTests=true --type=pipe</code>
    <br/><code><b>$</b> ng generate component history-list</code>
    <br/><code><b>$</b> ng generate component history-vocabulary</code>
    <br/><code><b>$</b> ng generate component history-progress-controller</code>
    <br/><code><b>$</b> ng generate component youglish</code>
    <br/><code><b>$</b> ng generate component record-yourself</code>
    <br/><code><b>$</b> ng generate component history-menu</code>
    <br/><code><b>$</b> ng generate component file-upload</code>
    <br/><code><b>$</b> ng serve --host 0.0.0.0 --port 9210</code>
    </li>
</ul>

#Install npm, nodejs and Angular CLI
Angular CLI will enable ng command
<ul>
    <li>Run below commands<br/>
        <code><b>$</b> sudo apt-get install nodejs<br/>
        <b>$</b> sudo apt-get install npm n<br/>
        <b>$</b> npm install -g @angular/cli
        </code>
    </li>
</ul>



#Upgrade your npm and nodejs
<ul>
    <li>Run below commands<br/>
        <code><b>$</b> sudo npm cache clean -f<br/>
        <b>$</b> sudo npm install -g n<br/>
        <b>$</b> sudo n stable
        </code>
    </li>
    <il>Start a new shell<br/>
        <code><b>$</b> node -v<br/>
        <b>$</b> npm -v
        </code>
    </il>
</ul>

#Fire Base
At the bottom of body tag include these lines: <br/>
<code>
&lt;!-- The core Firebase JS SDK is always required and must be listed first --&gt;<br/>
&lt;script src="/__/firebase/7.9.1/firebase-app.js">&lt:/script><br/>
<br/>
&lt;!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries --><br/>
&lt;script src="/__/firebase/7.9.1/firebase-analytics.js">&lt;/script>
<br/>
&lt;!-- Initialize Firebase --><br/>
&lt;script src="/__/firebase/init.js">&lt;/script>
</code>

#Install Fire Base CLI
<code>
npm install -g firebase-tools
</code>

#Implement webapp in Firebase Hosting
Go under your app directory and run thee commands:<br/>
<code>$ firebase login<br/>
$ firebase init</code>

<br/>
Edit firebase.json file<br/>
<code>
{
  "hosting": {
    "site": "threestepsenglish",
    "public": "public",
    ...
  }
}
</code>

<br/><br/>
Implement webapp<br/>
<code>$ firebase deploy --only hosting:threestepsenglish</code>