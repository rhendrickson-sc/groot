#!/bin/bash

# Install and configure WordPress if we haven't already
main() {
  BOLD=$(tput bold)
  NORMAL=$(tput sgr0)

  WP_DIR="$LANDO_MOUNT/wp"

  if ! [[ -f "$WP_DIR"/wp-content/themes/groot ]] ; then
    echo 'Linking groot theme directory...'
    ln -s "../../../" "$WP_DIR"/wp-content/themes/groot
  fi

  echo 'Checking for WordPress config...'
  if wp_configured ; then
    echo 'WordPress is configured'
  else
    read -d '' extra_php <<'EOF'
// log all notices, warnings, etc.
error_reporting(E_ALL);

// enable debug logging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
EOF

    # create a wp-config.php
    wp --path="$WP_DIR" config create \
      --dbname="$DB_NAME" \
      --dbuser="$DB_USER" \
      --dbpass="$DB_PASSWORD" \
      --dbhost="$DB_HOST" \
      --extra-php < <(echo "$extra_php")
  fi

  echo 'Checking for WordPress installation...'
  if wp_installed ; then
    echo 'WordPress is installed'
  else
    read -p "${BOLD}Site URL${NORMAL} (https://groot.lndo.site): " URL
    URL=${URL:-'https://groot.lndo.site'}

    read -p "${BOLD}Site Title${NORMAL} (Groot): " TITLE
    TITLE=${TITLE:-'Groot'}

    # Determine the default username/email to suggest based on git config
    DEFAULT_EMAIL=$(git config --global user.email)
    DEFAULT_EMAIL=${DEFAULT_EMAIL:-'admin@example.com'}
    DEFAULT_USERNAME=$(echo $DEFAULT_EMAIL | sed 's/@.*$//')

    read -p "${BOLD}Admin username${NORMAL} ($DEFAULT_USERNAME): " ADMIN_USER
    ADMIN_USER=${ADMIN_USER:-"$DEFAULT_USERNAME"}

    read -p "${BOLD}Admin password${NORMAL} (groot): " ADMIN_PASSWORD
    ADMIN_PASSWORD=${ADMIN_PASSWORD:-'groot'}

    read -p "${BOLD}Admin email${NORMAL} ($DEFAULT_EMAIL): " ADMIN_EMAIL
    ADMIN_EMAIL=${ADMIN_EMAIL:-"$DEFAULT_EMAIL"}

    # install WordPress
    wp --path="$WP_DIR" core install \
      --url="$URL" \
      --title="$TITLE" \
      --admin_user="$ADMIN_USER" \
      --admin_password="$ADMIN_PASSWORD" \
      --admin_email="$ADMIN_EMAIL" \
      --skip-email
  fi

  # TODO check before running somehow?
  # install/activate plugins and theme
  wp --path="$WP_DIR" plugin uninstall hello akismet
  wp --path="$WP_DIR" plugin install --activate timber-library
  wp --path="$WP_DIR" plugin activate conifer
  wp --path="$WP_DIR" theme activate groot

  # uninstall stock themes
  wp --path="$WP_DIR" theme uninstall twentyten twentyeleven twentytwelve \
    twentythirteen twentyfourteen twentyfifteen twentysixteen twentyseventeen

  # configure pretty permalinks
  wp --path="$WP_DIR" option set permalink_structure '/%postname%/'
  wp --path="$WP_DIR" rewrite flush

}


# Detect whether WP has been configured already
wp_configured() {
  [[ $(wp --path=$WP_DIR config path 2>/dev/null) ]] && return
  false
}

# Detect whether WP is installed
wp_installed() {
  [[ $(wp --path=$WP_DIR core is-installed 2>/dev/null) ]] && return
  false
}


main
