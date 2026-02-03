module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.test.js", "**/todo-service.spec.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: { lines: 90 }
  },
  collectCoverageFrom: [
    "**/solutions/todo-service.ts",
    "**/solutions/repository.ts",
  ],
};
