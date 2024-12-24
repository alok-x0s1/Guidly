const _config = {
	port: process.env.PORT || 3000,
	node_env: process.env.NODE_ENV || "development",
	clientUrl: process.env.CLIENT_URL,
	jwt_token_secret: process.env.JWT_TOKEN_SECRET || "secret",
	jwt_token_expiry: process.env.JWT_TOKEN_EXPIRY || "7d",
};

export const config = Object.freeze(_config);
