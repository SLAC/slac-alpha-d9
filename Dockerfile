ARG PHP_VERSION="8.0"
ARG COMPOSER_VERSION="2.3"
ARG NODE_VERSION="14"

FROM forumone/composer:${COMPOSER_VERSION}-php-${PHP_VERSION} AS base

# In some instances this is required.
WORKDIR /var/www/html

# This will copy everything into the dockerfile other than
# those excluded in the .dockerignore
COPY . .

# Install without dev dependencies
RUN set -ex \
  && composer install --no-dev --optimize-autoloader \
  && composer drupal:scaffold

FROM node:${NODE_VERSION}-alpine AS gesso

RUN mkdir /app

WORKDIR /app

RUN npm install --global npm@latest

COPY ["web/themes/gesso", "./"]

RUN if test -e package-lock.json; then npm ci; else npm i; fi

RUN set -ex \
  && npm run build-storybook \
  && npm run build \
  && rm -rf node_modules

FROM base AS linting
RUN composer install
COPY --from=gesso ["/app", "web/themes/gesso"]

ENTRYPOINT ["composer","lint"]

FROM busybox AS artifact
WORKDIR /var/www/html

COPY --from=base ["/var/www/html", "./"]
COPY --from=gesso ["/app", "web/themes/gesso"]

RUN if test -e .env.production; then mv .env.production .env; fi
