help:
	#   + ---------------- + ---------------------------------------------- +
	#   | Command          | Description                                    |
	#   + ---------------- + ---------------------------------------------- +
	#   | make ssh-up      | docker-compose up                              |
	#   | make ssh-d       | docker-compose up -d                           |
	#   | make ssh-down    | docker-compose down                            |
	#   | make ssh-remove  | docker-compose down --remove-orphans           |
	#   | make ssh-ps      | docker-compose ps                              |
	#   | make ssh-logs    | docker-compose logs                            |
	#   + ---------------- + ---------------------------------------------- +

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
