## Usage

- Create docker container

  ```sh
  docker build -t rabbit_mq .
  ```

- Run docker container

  ```sh
  docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbit_mq
  ```
