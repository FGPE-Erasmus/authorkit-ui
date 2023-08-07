# FGPE AuthorKit UI

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
    -v $(pwd)/docker/nginx.conf:/etc/nginx/nginx.conf \
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

## Acknowledgments

<table cellspacing="0" cellpadding="0" border=0>
<tr border=0>
<td border=0>

This software has been developed as a part of the Framework for Gamified Programming Education ([https://fgpe.usz.edu.pl/](https://fgpe.usz.edu.pl/)) and FGPE Plus: Learning tools interoperability for gamified programming education ([https://fgpeplus.usz.edu.pl/](https://fgpeplus.usz.edu.pl/)) projects which were co-funded by the Erasmus+ Programme of the European Union.

</td>
<td border=0>

![Framework for Gamified Programming Education project](docs/logo_FGPE.jpg) ![Erasmus+](docs/logo_erasmus.jpg)

</td>
</tr>
</table>

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

