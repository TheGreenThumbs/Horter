module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: { node: true, mocha: true },
  plugins: ["mocha"],
  overrides: [
    {
      files: "test/**/*.js",
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],
};
