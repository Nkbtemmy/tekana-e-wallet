COMPOSE_FILE = docker-compose.yaml
APP = app
DATABASE_NAME = postgres_db 

start: 
	docker-compose -f $(COMPOSE_FILE) up --build

up:
	docker-compose -f $(COMPOSE_FILE) up -d

down:
	docker-compose -f $(COMPOSE_FILE) down

build:
	docker-compose -f $(COMPOSE_FILE) build

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

exec:
	docker-compose -f $(COMPOSE_FILE) exec $(DATABASE_NAME) <command>

reset-db:
	docker-compose -f $(COMPOSE_FILE) down -v $(DATABASE_NAME)

ps:
	docker-compose -f $(COMPOSE_FILE) ps

clean:
	docker system prune --volumes --force

rebuild: down build

default: up

# .PHONY: up down build logs exec ps clean reset:db default