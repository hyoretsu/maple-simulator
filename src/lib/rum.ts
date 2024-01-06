"use client";
import { AwsRum } from "aws-rum-web";

const config = {
	sessionSampleRate: 1,
	guestRoleArn: "arn:aws:iam::182273057205:role/RUM-Monitor-us-east-1-182273057205-1291522254071-Unauth",
	identityPoolId: "us-east-1:b17d3531-e799-4caa-b853-e11016b14bd6",
	endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
	telemetries: ["performance", "errors", "http"],
	allowCookies: true,
	enableXRay: true,
};

const APPLICATION_ID = "66929798-1869-4254-91d1-7d140580c028";
const APPLICATION_VERSION = "1.0.0";
const APPLICATION_REGION = "us-east-1";

export const rum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
