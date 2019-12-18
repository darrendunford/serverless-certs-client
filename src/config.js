const dev = {
  STRIPE_KEY: "pk_test_MTeDKnVPgGNrjTgbxAXivQN200ABPWGX5b",
  s3: {
    REGION: "eu-west-2",
    BUCKET: "certs-app-api-dev-attachmentsbucket-1pfh6p5wv7rrq"
  },
  apiGateway: {
    REGION: "eu-west-2",
    URL: "https://c5rzxwnw03.execute-api.eu-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_G4gtBhWtz",
    APP_CLIENT_ID: "3h3oar0brjj895drlinud6h7rq",
    IDENTITY_POOL_ID: "eu-west-2:f2163f04-5418-4abe-b539-23bcb7ec5f3a"
  }
};

const prod = {
  STRIPE_KEY: "certs-app-api-prod-attachmentsbucket-1lpkofpu5uipg",
  s3: {
    REGION: "eu-west-2",
    BUCKET: "certs-app-api-prod-attachmentsbucket-1lpkofpu5uipg"
  },
  apiGateway: {
    REGION: "eu-west-2",
    URL: "https://9d85ddsend.execute-api.eu-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: "eu-west-2_54aEenn1u",
    APP_CLIENT_ID: "h2ure4efuuioebae7eftmdh9m",
    IDENTITY_POOL_ID: "eu-west-2:17fc54f8-a2fa-40c8-984f-12ebfb2b58f1"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
