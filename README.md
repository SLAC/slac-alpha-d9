# SLAC Alpha-D9

## Pantheon Setup

1. Ensure you have a [Pantheon account](https://pantheon.io/account)
1. Ping the TL your username to get added to the Pantheon site once you have an account
1. [Add your SSH key](https://pantheon.io/docs/ssh-keys) to your Pantheon account
1. [Install](https://pantheon.io/docs/terminus/install) and [Authenticate](https://pantheon.io/docs/terminus/install#authenticate) Terminus
1. Test your access to the site by running `terminus site:list` and ensuring `slac-alpha-d9` is in the list of sites you have access to

## Local Development

### Requirements
* Docker
  * [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
  * [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
* [DDEV](https://ddev.readthedocs.io/en/stable/)

### Setup

1. Clone the repo: `git clone git@github.com:slac/slac-alpha-d9.git`
1. Create `.env` file: `cp .env.example .env`
1. Start the project: `ddev start`
1. Install dependencies: `ddev composer install`
1. Build the theme: `ddev gesso install && ddev gesso build`

### To install the site from configuration:

1. Run `ddev drush si --existing-config`
1. Ensure all latest config is installed and clear cache: `ddev drush deploy`

### To install the latest database and files from `dev`:

#### Ensure `ddev` is configured with terminus authentication:
1. Login to your Pantheon Dashboard, and [Generate a Machine Token](https://pantheon.io/docs/machine-tokens/) for ddev to use.
1. Add the API token to the web_environment section in your global ddev configuration at ~/.ddev/global_config.yaml
   ```
   web_environment:
   - TERMINUS_MACHINE_TOKEN=abcdeyourtoken
   ````
1. Restart ddev with `ddev restart`

#### Pull the files and database
1. Run `ddev pull pantheon` to connect to Pantheon and download the latest backup of the database and files for the `dev` environment
1. Clear cache: `ddev drush cr`

## Drush on Pantheon Sites
To run drush commands on any of the Pantheon-hosted dev sites, you will
need to use Terminus. After installing and setting up, you can run
`terminus drush slac-alpha-d9.[env] -- [drush command]`. For example, to clear
cache on the dev site, run `terminus drush slac-alpha-d9.dev -- cr`.

## Troubleshooting

### Xdebug
Xdebug is available in the Docker container but it is not running by default. To spin up the project with Xdebug enabled, run `ddev xdebug` to turn xdebug on, or `ddev xdebug off` when you're done.

You'll also need to install an Xdebug plugin for your browser. Xdebug Helper is available for Chrome and Firefox.

PHP Debug is a popular Visual Studio Code extension to add support for XDebug. You'll need to configure pathMappings in the launch.json settings for PHP Debug:

```
"pathMappings": {
    "/var/www/html": "${workspaceRoot}"
}
```


## Platform Environments
