# = = = = = = = = = = = = = = = = help

help:
	#   Modes:
	#    - dev - БД из docker-compose
	#			запускать приложение через `make dev`
	#    - prod - БД и APP из docker-compose (образ APP из Dockerfile)
	#    - ssh - БД и APP из docker-compose (образ APP из DockerHub)
	#
	#   + ---------------- + ---------------------------------------------- +
	#   | Command          | Description                                    |
	#   + ---------------- + ---------------------------------------------- +
	#   | make dev         | npm run migration:run:dev && npm run start:dev |
	#   |                  |                                                |
	#   | make dev-up      | docker-compose up                            	|
	#   | make dev-d       | docker-compose up -d                           |
	#   | make dev-down    | docker-compose down                            |
	#   | make dev-remove  | docker-compose down --remove-orphans           |
	#   | make dev-ps      | docker-compose ps                              |
	#   | make dev-logs    | docker-compose logs                            |
	#   |                  |                                                |
	#   | make prod-up     | docker-compose up                              |
	#   | make prod-d      | docker-compose up -d                           |
	#   | make prod-down   | docker-compose down                            |
	#   | make prod-remove | docker-compose down --remove-orphans           |
	#   | make prod-ps     | docker-compose ps                              |
	#   | make prod-logs   | docker-compose logs                            |
	#   |                  |                                                |
	#   | make ssh-up      | docker-compose up                              |
	#   | make ssh-d       | docker-compose up -d                           |
	#   | make ssh-down    | docker-compose down                            |
	#   | make ssh-remove  | docker-compose down --remove-orphans           |
	#   | make ssh-ps      | docker-compose ps                              |
	#   | make ssh-logs    | docker-compose logs                            |
	#   + ---------------- + ---------------------------------------------- +

# = = = = = = = = = = = = = = = = development

dev: help
	sh ./dev.run.sh

dev-up: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env up

dev-d: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env up -d

dev-down: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env down

dev-remove: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env down --remove-orphans

dev-ps: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env ps

dev-logs: help
	docker-compose -f dev.docker-compose.yml --env-file=dev.env logs

# = = = = = = = = = = = = = = = = production

prod-up: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env build
	docker-compose -f prod.docker-compose.yml --env-file=prod.env up

prod-d: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env build
	docker-compose -f prod.docker-compose.yml --env-file=prod.env up -d

prod-down: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env down

prod-remove: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env down --remove-orphans

prod-ps: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env ps

prod-logs: help
	docker-compose -f prod.docker-compose.yml --env-file=prod.env logs

# = = = = = = = = = = = = = = = = ssh

ssh-up: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env build
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env up

ssh-d: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env build
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env up -d

ssh-down: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env down

ssh-remove: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env down --remove-orphans

ssh-ps: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env ps

ssh-logs: help
	docker-compose -f ssh.docker-compose.yml --env-file=ssh.env logs
