const dev = {
  STRIPE_KEY: "pk_test_MTeDKnVPgGNrjTgbxAXivQN200ABPWGX5b",
  s3: {
    REGION: "eu-west-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-s6oqchgkikjp"
  },
  apiGateway: {
    REGION: "eu-west-2",
    URL: "https://ktta1xv1d5.execute-api.eu-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_w9DYr1ddb",
    APP_CLIENT_ID: "3isuht6okjlaoc1hq8ik2a5p2m",
    IDENTITY_POOL_ID: "eu-west-2:306eb807-0b08-4dfe-8d2b-958c5a481e52"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_MTeDKnVPgGNrjTgbxAXivQN200ABPWGX5b",
  s3: {
    REGION: "eu-west-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1ci2kvwrzmd77"
  },
  apiGateway: {
    REGION: "eu-west-2",
    URL: "https://ymk52zv4g9.execute-api.eu-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_mVYEJszpo",
    APP_CLIENT_ID: "7ufi1m2ad0mlcvv6q3tf9000nl",
    IDENTITY_POOL_ID: "eu-west-2:a4b3c7a0-5f9e-4cae-8146-1635b3412821"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
