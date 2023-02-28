## Запуск MS3

Установка пакетов и env

```bash
yarn # npm i
cp dev.env.example dev.env
cp prod.env.example prod.env
cp ssh.env.example ssh.env
```

Запускаем сервер для разработки:

```bash
make dev
```

## Загрузка MS3 на Google Cloud App Engine

Первый раз:

```bash
gcloud projects list
gcloud config set project rsiot-po4-190333
gcloud app create
gcloud app deploy app.yaml
gcloud app browse
gcloud app describe
```

Обновление проекта:

```bash
gcloud app deploy app.yaml
gcloud app browse
gcloud app describe
```

## Загрузка MS3 на DockerHub

```bash
docker login
docker build --file prod.Dockerfile -t pavelinnokentevichgalanin/8sem-rsiot-ms3 .
docker push pavelinnokentevichgalanin/8sem-rsiot-ms3
```
