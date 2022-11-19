compose:
	docker compose -f ./docker.yml up
	docker exec database-db-1 bash /app/init.sh

clean:
	docker stop database-db-1 
	docker rm database-db-1 
	docker image rm database_db