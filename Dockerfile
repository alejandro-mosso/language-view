FROM angular/ngcontainer:0.10.0

MAINTAINER Alejandro Mosso.

USER root

RUN npm install videogular2 --save
RUN npm install @types/core-js --save-dev
RUN npm install recordrtc --save
RUN npm install webrtc-adapter --save
RUN npm install ngx-audio-player --save
RUN mkdir /app
WORKDIR /app
COPY ./app/ /app

