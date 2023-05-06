# eCommerce-application

## Running Project

1. Install docker https://docs.docker.com/engine/install/
2. Install docker compose plugin https://docs.docker.com/compose/install/
3. Open root folder of project
4. Paste this comand

```
docker compose up -d --build
```

## Important docker commands

**Start container without build**

```
docker compose up -d
```

**Show all containers**

```
docker compose ps
```

use `-a` flag to show also containers that dont run

**Enter inside container**

```
docker compose exec <container_name> bash
```

**Show logs of container**

```
docker compose logs <container_name>
```

## Setting environment

## Setting frontend linters

### Install in visual studio code ,,Prettier - Code formatter" extension

After installation process, restart your vs code.

### Change vs code settings settings:

1. Click `file` -> `Preferences`
2. Find option `Editor: Code formatter` and pick Prettier.
3. Find option `Editor: Format On Save` and check box if is unchecked.
4. Open terminal in frontend folder.
5. Use command `yarn install --check-files`.
6. After these steps, code should be formatted automatically after clicking `Ctrl` + `s`.

### Linter console commands

You can use them in your local environment/docker container.
<br>
<br>
`/yarn lint` - show problems in all unformatted files.
<br>
`--fix` - with this flag, linter will try to format all problematic files.

## Setting backend linters

## Running backend

**Create and activate venv**

```
python3 -m venv venv
source venv/bin/activate
```

**Install requirements**

```
pip install -r requirements.txt
```

**To run the code, use**

```
python -m main
```

## Openapi documentation

Openapi documentation is available localy under
http://localhost:8000/docs#/
