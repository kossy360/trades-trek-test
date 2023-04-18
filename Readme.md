# Trades Trek Test

The project consists of two applications

- backend: A nestjs application
- frontend: A next.js application

## Running

At the root of the project, run:

```bash
docker compose up
```

Access frontend runs on Port `3000` and the backend on Port `8000`. The postgres database is also exposed on Port `5435`.

## Improvements

- Testing
- API documentation

## Notes

Every subscription expires after 5 minutes irrespective of the displayed duration, this is to allow for testing the expiration workflow.
