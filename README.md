<p align="center">
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg"
    />
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
    />
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    />  
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    />
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    />
    <img
        height="100"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    />
</p>

# Распределённые системы и облачные технологии

## Список лабораторных работ
- lab1 - Написание базового приложения
- lab2 - GCP: Compute Engine
- lab3 - GCP: App Engine
- lab4 - GCP: Cloud Functions
- lab5 - Docker
- lab6 - GCP: Kubernetes Engine

## Код и отчёты лабораторных работ
- lab1
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab1)
    - [код APP](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/tree/main/lab1/sources/APP)
    - [код Swagger](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab1/sources/APP/swagger.json)
- lab2
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab2)
- lab3
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab3)
    - [код MS2](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/tree/main/lab3/sources/MS2)
    - [код MS3](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/tree/main/lab3/sources/MS3)
- lab4
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab4)
    - [код MS4](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/tree/main/lab4/sources/MS4)
- lab5
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab5)
    - [код Dockerfile для MS2](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab5/sources/MS2/prod.Dockerfile)
    - [код Dockerfile для MS3](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab5/sources/MS3/prod.Dockerfile)
    - [код docker-compose.yml для MS2](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab5/sources/DOCKER/MS2/ssh.docker-compose.yml)
    - [код docker-compose.yml для MS3](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab5/sources/DOCKER/MS3/ssh.docker-compose.yml)
- lab6
    - [отчёт](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/releases/tag/RSiOT.PO4.190333-lab6)
    - [код deployment-ms2.yml для MS2](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab6/sources/K8S/deployment-ms2.example.yaml)
    - [код deployment-ms3.yml для MS3](https://github.com/BrSTU-PO4-190333/8sem_RSiOT/blob/main/lab6/sources/K8S/deployment-ms3.example.yaml)

## Дерево показывающее код лабораторных работ

```bash
sudo apt update
sudo apt install -y tree
tree -d
```

```bash
.
├── lab1
│   ├── reports
│   └── sources
│       └── APP     # APP - приложение NestJS со SwaggerUI
├── lab2            # MS2 - тоже приложение APP
│   └── reports
├── lab3
│   ├── reports
│   └── sources
│       ├── MS2     # MS2 - тут для NestJS добавил Google Cloud PubSub
│       └── MS3     # MS3 - тут для NodeJS написал отправку в Google Cloud PubSub
├── lab4
│   ├── reports
│   └── sources
│       └── MS4     # MS4 - NodeJS приложение отправляет данные в BigTable и BigQuery
├── lab5
│   ├── reports
│   └── sources
│       ├── DOCKER
│       │   ├── MS2 # MS2 - тут docker-compose.yml
│       │   └── MS3 # MS3 - тут docker-compose.yml
│       ├── MS2     # MS2 - тут для NestJS Dockerfile
│       └── MS3     # MS3 - тут для NodeJS Dockerfile
└── lab6
    ├── reports
    └── sources
        └── K8S     # K8S - тут deployment-ms2.yaml и deployment-ms3.yaml
```
