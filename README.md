# Spaced repetition API!

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

DEMO USER INFO:
"username": "langful1",
"password": "1234ABC!b",
"name": "Langful Demo"

Heroku Deployment Info:
Creating app... done, ⬢ still-savannah-14808
https://still-savannah-14808.herokuapp.com/ | https://git.heroku.com/still-savannah-14808.git

Created postgresql-shallow-63083 as DATABASE_URL
DATABASE_URL: postgres://zmbauvralitwvu:e638825a31dbae2b889eb3b8bba6278bd96c3abe68cfff8033eea18a08f0f7ac@ec2-107-22-241-205.compute-1.amazonaws.com:5432/da6e5s03170cmt

