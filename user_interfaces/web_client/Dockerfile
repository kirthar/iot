FROM node:latest

LABEL vendor=Kirthar \
  com.iot.is-beta=true \
  com.iot.is-production="" \
  com.iot.version="0.0.1-alpha"

ADD . /
RUN npm install

ENV PORT 8082
ENV PROCESS_TITLE "web_server"

EXPOSE 8082

CMD [ "npm", "start" ]


