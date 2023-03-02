## Install virtualbox:

```bash
sudo apt update
sudo apt install virtualbox
```

## Install kubectl:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```

## Install minikube:

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube version
```


> Создаём кластер:
> 
> ```bash
> minikube start --cpus=2 --memory=2gb --disk-size=20gb --vm-driver=virtualbox
> ```
> 
> ```bash
> kubectl get componentstatuses
> kubectl cluster-info
> kubectl get nodes
> kubectl get pods
> ```
> 
> Создаем под
> 
> ```bash
> kubectl run hello --image=httpd:latest --port=80
> kubectl get pods
> kubectl describe pods hello
> 
> # kubectl exec hello date
> 
> # kubectl exec -it hello sh
> # ls
> # exit
> 
> kubectl logs hello
> kubectl port-forward hello 7788:80
> 
> kubectl get pods
> kubectl delete pods hello
> kubectl get pods
> ```
> 
> Создание пода через конфиг:
> 
> ```bash
> kubectl apply -f pod-myweb-ver1.yaml
> 
> kubectl get pods
> kubectl port-forward my-web 8888:80
> 
> kubectl get pods
> kubectl delete -f pod-myweb-ver1.yaml
> kubectl get pods
> ```
> pod-myweb-ver1.yml:
> ```yml
> apiVersion: v1
> kind: Pod
> metadata:
>   name: container-apache
> spec:
>   containers:
>     - name: container-apache
>       image: httpd:latest
>       ports:
>         - containerPort: 80
> ```

Создаем кластер:

```bash
minikube start --cpus=2 --memory=2gb --disk-size=20gb --vm-driver=virtualbox
```

Если перезапустили ноутбук, то кластер будет выключен и его нужно поднять:

```bash
minikube start
```

## Запускаем MS2:

```bash
cp pod-ms2-ver1.example.yaml pod-ms2-ver1.yaml

# меняем настройки env в файле pod-ms2-ver1.yaml

kubectl apply -f pod-ms2-ver1.yaml  # запускаем под

kubectl get pods                    # смотрим активные поды
kubectl describe pods ms2           # больше информации о MS2
kubectl logs ms2                    # смотрим логи MS2
kubectl port-forward ms2 2222:44480 # открываем порт на своей машине

kubectl get pods                    # смотрим активные поды
kubectl delete -f pod-ms2-ver1.yaml # удаляем под kubectl delete pods ms2
kubectl get pods                    # смотрим активные поды
```

## Запускаем MS3:

```bash
cp pod-ms3-ver1.example.yaml pod-ms3-ver1.yaml

# меняем настройки env в файле pod-ms3-ver1.yaml

kubectl apply -f pod-ms3-ver1.yaml  # запускаем под

kubectl get pods                    # смотрим активные поды
kubectl describe pods ms3           # больше информации о MS3
kubectl logs ms3                    # смотрим логи MS3
kubectl port-forward ms3 3333:8080  # открываем порт на своей машине

kubectl get pods                    # смотрим активные поды
kubectl delete -f pod-ms3-ver1.yaml # удаляем под kubectl delete pods ms3
kubectl get pods                    # смотрим активные поды
```

## Создание кластеров

```bash
gcloud init                                                         # соединяемся с Google Cloud
gcloud services enable container.googleapis.com                     # включаем Google API
gcloud container clusters create rsiot-po4-190333-cluster           # создаем кластер
gcloud components install gke-gcloud-auth-plugin                    # установка SDK для работы с kubectl
gcloud container clusters get-credentials rsiot-po4-190333-cluster  # переключаемся на кластер
kubectl cluster-info            
kubectl get componentstatuses      
kubectl get nodes                                     
```

Создать кластер используя определенное количество nodes

```bash
gcloud container clusters create rsiot-po4-190333-cluster-2 --num-nodes=2 # создаем кластер
gcloud container clusters get-credentials rsiot-po4-190333-cluster-2      # переключаемся на кластер
gcloud container clusters delete rsiot-po4-190333-cluster-2               # удаляем кластер

gcloud container clusters get-credentials rsiot-po4-190333-cluster        # переключаемся на кластер
```

```bash
gcloud container clusters get-credentials rsiot-po4-190333-cluster
kubectl apply -f pod-ms3-ver1.yaml

kubectl get pods # проверить, что поды запустились успешно
kubectl get services # проверить, что сервисы запущены и доступны для использования
kubectl get deployments # проверить, что деплойменты запустились успешно

kubectl create deployment nginx-deployment --image=nginx:latest
kubectl get deployments
kubectl get pods
kubectl expose deployment nginx-deployment --type=LoadBalancer --port=8888 --target-port=8888
```

Запустить четыре пода, чтобы всегда их создавалось 4:

```bash
kubectl scale deployment nginx-deployment --replicas 4
kubectl get pods
kubectl get deployments
kubectl get rs
```

```bash
kubectl autoscale deployment nginx-deployment --min=4 --max=6 --cpu-percent=80
kubectl get hpa
```

```bash
kubectl rollout history deployment/nginx-deployment
kubectl rollout status deployment/nginx-deployment
kubectl describe deployment nginx-deployment

kubectl set image deployment/nginx-deployment nginx=httpd:latest --record # устанавливает другой image
kubectl rollout status deployment/nginx-deployment
kubectl rollout history deployment/nginx-deployment

kubectl rollout undo deployment/nginx-deployment # откатиться к предыдущей версии
kubectl rollout status deployment/nginx-deployment
kubectl rollout history deployment/nginx-deployment

kubectl rollout undo deployment/nginx-deployment --to-revision=2 # вернуться на определенную версию
kubectl rollout status deployment/nginx-deployment
kubectl rollout history deployment/nginx-deployment

kubectl rollout restart deployment/nginx-deployment # если есть nginx:latest и вышла новая версия lates, то он её скачает

kubectl delete deployment/nginx-deployment
```

Запуск deployment из конфига:

```bash
kubectl apply -f deployment-1-nginx.yaml
kubectl get deployments
kubectl get pods

kubectl port-forward nginx-deployment-64844f5f84-mjmn5 8888:80

kubectl delete -f deployment-1-nginx.yaml
kubectl get deployments
kubectl get pods
```

```bash
kubectl apply -f deployment-2-nginx-replicase.yaml
kubectl get deployments
kubectl get pods

kubectl port-forward nginx-deployment-replicase-6cccd7444c-9mfqr 8888:80

kubectl delete -f deployment-2-nginx-replicase.yaml
kubectl get deployments
kubectl get pods
```

```bash
kubectl apply -f deployment-3-nginx-autoscaling.yaml
kubectl get hpa
kubectl get deployments
kubectl get pods

kubectl port-forward nginx-deployment-autoscaling-6d5d9c9667-7tsdh 8888:80

kubectl delete -f deployment-3-nginx-autoscaling.yaml
kubectl get hpa
kubectl get deployments
kubectl get pods
```

## Запуск deployment MS3

```bash
gcloud container clusters get-credentials rsiot-po4-190333-cluster

kubectl apply -f deployment-ms3.yaml
kubectl get deployments
kubectl get pods

kubectl port-forward ms3-deployment-7bbb9d8ff9-fdqzh 8888:8080

kubectl delete -f deployment-ms3.yaml
kubectl get deployments
kubectl get pods
```

## Запуск deployment MS2

```bash
gcloud container clusters get-credentials rsiot-po4-190333-cluster

kubectl apply -f deployment-ms2.yaml
kubectl get deployments
kubectl get pods

kubectl port-forward ms2-deployment-5599b6f9f7-vpbmc 8888:44480

kubectl delete -f deployment-ms2.yaml
kubectl get deployments
kubectl get pods
```
