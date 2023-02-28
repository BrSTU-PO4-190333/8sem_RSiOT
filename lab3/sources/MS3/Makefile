help:
	#   Modes:
	#    - dev - запускается MS3 из node
	#    - prod - MS3 из docker-compose (образ MS3 из Dockerfile)
	#    - ssh - MS3 из docker-compose (образ MS3 из DockerHub)
	#
	#   + ---------------- + ---------------------------------------------- +
	#   | Command          | Description                                    |
	#   + ---------------- + ---------------------------------------------- +
	#   | make dev         | npm run start:dev                            	|
	#   |                  |                                                |
	#   | make start       | npm run start                                  |
	#   | make prod        | npm run start:prod                             |
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

dev:
	npm run start:dev

# = = = = = = = = = = = = = = = = production

start:
	npm run start

prod:
	npm run start:prod

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
