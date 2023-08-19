const express = require("express");
const app = express();
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const createErrorMiddleware = require("./middleware/error");
const sequelize = require("./config/database");
const userRoutes = require("./routes/auth");

const errorMiddleware = createErrorMiddleware(logger);
app.use(bodyParser.json());

app.use("/", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(
        `Connection has been established successfully. Server is running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    logger.error("Unable to connect to the database:", error);
  });

app.use(errorMiddleware);
