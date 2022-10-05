# Drupal with Composer Northern Commerce training site

## About

This project was created during a 9 week collaboration course between Nothern Commerce and Fanshawe College.
The course focused on [Drupal 9](https://www.drupal.org/) it explored setup using Composer, Taxonomy, Vocabulary, Theming with Twig and bootstrap, as well as creating a custom module
The project was created using [Pantheon](https://www.Pantheon.io) as the original hosting, with computer backend using [MAMP](https://www.mamp.info/), or [WAMP](https://www.wampserver.com/)

## To Run Site

- Clone the repo into your hosting enviroment, whether WSL, MAMP, WAMP, or other and add the site as you normally would
- Create a database in your SQL service called "nother-db"
  - import the database located inside

    ```sh
    kgr-training-site/database/
    ```

  - If you need to update the port, login information or change the database name you can find the local setting file at:

    ``` sh
    kgr-training-site/web/sites/default/settings.local.php
    ```

- open the site using your dev enviroment
  - you may presented a listing of the folders, if this is the case navigate to

    ```sh
    web/
    ```

## Constrants

- Requires a dev enviroment with PHP 7.4 or newer
  - PHP 8.1 is recommended
