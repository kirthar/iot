FROM node:latest

LABEL vendor=Kirthar \
  com.iot.is-beta=true \
  com.iot.is-production="" \
  com.iot.version="0.0.1-alpha"

ADD ./command_bus.js /command_bus.js
ADD ./roles /roles
RUN npm install seneca

ENV PORT 10101
ENV PROCESS_TITLE "command_bus"

EXPOSE 10101

CMD [ "node", "command_bus.js" ]


