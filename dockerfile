# Build step #1: build the React front end
FROM node:16-alpine as build-step
ADD . /chariot
WORKDIR /chariot/frontend
RUN yarn install
RUN yarn build
CMD [ "yarn", "start" ]

FROM python:3.8-alpine
COPY Pipfile* ./
WORKDIR /chariot/backend

RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install  -r requirements.txt

EXPOSE 3000

CMD ["python", "server.py"]