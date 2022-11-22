SLAC Stanford Person Importer is based off of the following modules:

# [Stanford Person](https://github.com/SU-SWS/stanford_person)
##### Version: 8.x-1.x
# [Stanford Migrate](https://github.com/SU-SWS/stanford_migrate)
##### Version: 8.x-1.x

Please see those modules for context, additional details, and maintainers

Changelog: [Changelog.txt](CHANGELOG.txt)

Description
---

- This module, the Stanford Person Importer, is a modified version of the Stanford Person's, Stanford Person Importer submodule
- This module's Person content type is manually configured and has different fields than the Stanford Person content type
- This module uses Drupal cron and not Ultimate cron
- This module adapted the following code from the Stanford Migration module rather than using the full module as a dependency
-- Migration source plugin for ImageDimensionSkip
-- Service to pull in migrated nodes to alter the node edit form to indicate fields with imported data
- Both are pulling from the same CAP Profile data

Installation
---

Installation is dependent on 
- Person content type 
- public://media/person needs to exist and be writable by the web server

1. The following Drupal modules and libraries are dependencies and need to be installed:
  - composer require drupal/config_pages
  - composer require drupal/encrypt
  - composer require drupal/field_encrypt
  - composer require drupal/key
  - composer require drupal/migrate_file
  - composer require drupal/migrate_plus
  - composer require drupal/migrate_tools
  - composer require drupal/readonly_field_widget
  - composer require drupal/real_aes
  - composer require sainsburys/guzzle-oauth2-plugin

2. Enabling this module will enable the needed dependencies and import some configuration to include:
  - Config Pages
  - Migrations
  - Access modules

Additional Configuration
---

Keys
- Generate a hash key to encrypt the CAP username and password.  For example, you can generate a valid string with: 

    dd if=/dev/urandom bs=32 count=1 | base64 -i -

- This base-64 encoded key can be added: /admin/config/system/keys/manage/stanford_encryption

Add CAP configuration at: admin/config/importers/person-importer
- Note that each Work Group or Organization generates a separate migration url that will return at most 25 rows each
- Each uid returns the one profile specified

Migrations are coded to run every hour on cron.  However, you can manually execute migrations at: 

  /admin/structure/migrate/manage/su_stanford_person/migrations/su_stanford_person/execute

