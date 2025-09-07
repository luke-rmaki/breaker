// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "breaker",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",      
      providers: {
        aws: {
          profile: input.stage === "production" ? "luke-rmaki-prod" : "luke-rmaki-dev"
        }
      }

    };
  },
  async run() {
    new sst.aws.SvelteKit("BreakerWeb");
  },
});
