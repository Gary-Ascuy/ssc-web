# Serial Servo Control - Web Application
This project allow to control a Serial Servo Controller Board Remotely using web application.

## Install as a user
```
npm i --global serial-servo-control-webapp
```

## Install as a developer

### Install dependencies
```
$ npm install
```

### Create symlink for ssc-server and ssc-agent commands
```
$ npm link
```

## Executes

### Starts HTTP Server (Web Application)
```
# Starts the server in default port (3666)
$ ssc-server

# OR Starts the server in port (6000)
$ PORT=6000 ssc-server
```

### Starts Agent
```
# Starts the agent with default host (http://localhost:3666)
$ ssc-agent

# OR Starts the agent with spesific host (http://localhost:6000)
$ HOST=http://localhost:6000 ssc-agent
```

## Example Commands
```
> open
> #0P500
> #0P2500
> $move 0 500
```

## Screenshoot
![Web Application](https://github.com/Gary-Ascuy/ssc-web/raw/master/assets/webapp-screenshot.png)

