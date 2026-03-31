// eslint.config.cjs
module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // CommonJS 코드용
      globals: {
        require: "readonly", // require 전역 허용
        console: "readonly",  // console 전역 허용
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "no-undef": "error",      // 정의되지 않은 변수 체크
      "no-unused-vars": "warn", // 사용 안 하는 변수 경고
      "no-console": "off",      // 서버라 console 허용
    },
  },
];