# Config Profile

This module implements a [`config_filter`](https://www.drupal.org/project/config_filter) (as [`config_split`](https://www.drupal.org/project/config_split) and [`config_ignore`](https://www.drupal.org/project/config_ignore) does) to help installation profile developers to update the profile quickly.

## Installation

Navigate to [your preferred release](https://www.drupal.org/project/config_profile/releases), and then run the displayed *Install with Composer* command.

## Configuration

Go to *Administration > Configuration > Development > Synchronize > Profile* and set the profile in which you would like to export the active configuration on every `drush config-export` execution. Optionally, you can specify a set of config entities that you don't want to be exported to the installation profile.

## Usage

```sh
drush config-export
```

This module searches recursively in the installation profile, and overrides the existing configuration files in the place where they are. This means that if you have several modules inside your profile, `drush config-export` will override the module's configuration entities in the right places.  For example:

* `profiles/my_profile/config/install`
* `profiles/my_profile/config/optional`
* `profiles/my_profile/modules/my_module/config/install`

## Notes

1. The operation of this module happens as a side effect.  That is, when `drush config-export` runs, it still exports configuration to the configured configuration directory in your site's settings, the main one.  But it will *also* export configuration to the configured profile's configuration directory.  As such, you don't need to set your site's configuration directory to that of the profile.
2. It only exports things that have changed based on the main configuration store that your site has configured. So if you're not seeing the changes you're expecting, empty the main directory before running the command.  Otherwise, you may get an incomplete set of changes exported to the `config_profile` directory.
3. UUIDs are removed in the exported profile configuration so that the configuration can be imported anywhere.

## Warning!

Use with caution. Always review the location of your config entities before you commit. Placing config entities in the wrong directory (e.g. `config/install`, `config/optional`, etc.) can break your installation profile.
