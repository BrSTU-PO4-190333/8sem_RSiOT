## Install API on computer

Install git:

```bash
sudo apt update
sudo apt install git
```

Install NodeJS:

```bash
sudo apt update
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash
sudo apt-get install -y nodejs
sudo npm i -g yarn
```

Install Docker:

```
sudo apt update
sudo apt install docker.io
sudo apt install docker-compose

sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker
```

Install make:

```bash
sudo apt update
sudo apt install make
```

Install postgres:

```bash
sudo apt update
sudo apt install postgresql
```

```bash
sudo -i -u postgres
psql
```

```sql
CREATE DATABASE database;
CREATE USER admin;
ALTER USER admin password 'secret123password';
exit
exit
```

Clone repository and install:

```bash
ssh-keygen # Enter, Enter, Enter
cat ~/.ssh/id_rsa.pub # Copy and paste to https://github.com/settings/ssh/new
git clone git@github.com:BrSTU-PO4-190333/8sem_RSiOT_APP.git
cd 8sem_RSiOT_APP/sources/APP
yarn # npm i
```

### Development

```bash
cp dev.env.example dev.env
make dev-d  # start Postgres on docker-compose
make dev    # start NestJS
```

### Production

```bash
cp prod.env.example prod.env
make prod-up # start Postgres and NestJS on Docker and docker-compose
```

Push to DockerHub:

```bash
#docker login
#docker build --file prod.Dockerfile -t pavelinnokentevichgalanin/sem8-rsiot-app .
#docker push pavelinnokentevichgalanin/sem8-rsiot-app

docker login
docker build --file prod.Dockerfile -t pavelinnokentevichgalanin/sem8-rsiot-ms2 .
docker push pavelinnokentevichgalanin/sem8-rsiot-ms2
```

## Start docker-compose on SSH

```bash
sudo apt update
sudo apt install git docker.io docker-compose make htop mc

sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker

# $ ssh-keygen
# $ cat ~/.ssh/id_rsa.pub # Copy public-key and paste on this url https://github.com/settings/ssh/new
# $ git clone git@github.com:<имя пользователя github>/<имя репозитория>.git
# $ cd <имя репозитория>
cd sources/APP
```

```bash
cp ssh.env.example ssh.env
make ssh-d
```
