
## DEVELOPMENT ENVIRONMENT

### Dev environment start at port 3000

**To build the app**

```
docker-compose -f docker-compose.dev.yml build
```

**To start the app**

```
docker-compose -f docker-compose.dev.yml up
```

**To bring down the app**

```
docker-compose -f docker-compose.dev.yml down
```

## PRODUCTION ENVIRONMENT

### Production environment starts at default http port: 8080

**To build the app**

```
docker-compose -f docker-compose.prod.yml build
```

**To start the app**

```
docker-compose -f docker-compose.prod.yml up
```

**To bring down the app**

```
docker-compose -f docker-compose.prod.yml down
```
