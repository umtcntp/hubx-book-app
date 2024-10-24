# Book API

This is a simple Book API built with Node.js, Express, and MongoDB.

## Running the Project

The project can be run using Docker. Use the following command to build and start the application:

```javascript
docker-compose up --build
```

## Testing

If you want to run tests, you should change the MongoDB connection in the `index.js` file (config.db) to the following:

```javascript
mongodb://localhost:27017/test
```
