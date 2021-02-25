# FGPE AuthorKit UI

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

The UI of a toolkit to author gamified activities to support programming learning. This is part of the Erasmus+ Project entitled Framework for Gamified Programming Education (FGPE).

## Project setup
```
npm install
```

## Setup environment
```
cp .env.example .env
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production with Docker
```
docker build -t fgpe/authorkit-ui:latest .
```

### Serves for production with Docker
```
docker run -it -p 8080:80 \
    -v $(pwd)/.env:/usr/share/nginx/html/.env \
    -v $(pwd)/docker/nginx.conf:/etcginx/nginx.conf \
    --rm fgpe/authorkit-ui:latest
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
