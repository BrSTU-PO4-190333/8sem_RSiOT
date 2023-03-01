Install virtualbox:

```bash
sudo apt update
sudo apt install virtualbox
```

Install kubectl:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```

Install minikube:

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

Запускаем MS2:

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

Запускаем MS3:

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
