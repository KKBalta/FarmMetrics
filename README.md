```markdown
# FarmMetrics

Welcome to the FarmMetrics repository. This guide will help you get the application up and running on your local machine using Docker Compose.

## Prerequisites

Before you begin, make sure you have Docker and Docker Compose installed on your machine. If you do not have Docker installed, please follow the instructions here:
- Docker: [Get Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)
 ```
## Running the Application

To run the FarmMetrics application, follow these steps:

1. **Clone the Repository**
   First, clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/KKBalta/FarmMetrics.git
   cd FarmMetrics
   ```

2. **Start the Application**
   Use Docker Compose to build and start the services defined in the `docker-compose.yml` file. Run the following command in the root directory of the project:

   ```bash
   docker-compose up --build
   ```

   This command will download the necessary Docker images, build your application images, and start all the services specified in `docker-compose.yml`. The `--build` flag ensures that the images are built with the latest version of the source code.

3. **Access the Application**
   Once all services are up and running, open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the FarmMetrics application.

   If everything is set up correctly, you should see the application's frontend interface. This interface interacts with the backend services, all running within your Docker environment.

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where you ran the `docker-compose up` command. To remove all the containers along with their volumes, you can run:

```bash
docker-compose down -v
```

This command stops and removes all containers, networks, and the default volumes declared in the `docker-compose.yml` file.

Thank you for using the FarmMetrics application! For any issues or contributions, please refer to the project's GitHub issues page or submit a pull request.
```

This guide provides users with clear instructions on how to get your application running locally. It addresses the setup, running, and basic usage of the application through Docker Compose, and how to access it on `localhost:3000`. Adjust any specific commands or URLs according to your project's configuration as necessary.
