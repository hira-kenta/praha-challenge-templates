module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["**/functions.ts", "**/nameApiService.ts","**/problem4.ts", "**/problem4Api.ts"],
};
