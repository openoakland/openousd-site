docker rm $(docker ps -aq --filter ancestor=openousd-site_gatsby)

docker volume prune

docker rmi openousd-site_gatsby
