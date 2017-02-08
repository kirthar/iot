FROM node:latest

LABEL vendor=Kirthar \
  com.iot.is-beta=true \
  com.iot.is-production="" \
  com.iot.version="0.0.1-alpha"

ADD . /
RUN npm install

ENV PORT 3001
ENV PROCESS_TITLE "light_server"

CMD [ "npm", "start" ]


