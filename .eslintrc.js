module.exports = {
  "extends": "next/core-web-vitals",
  rules: {
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
  },
  plugins:[
    "react",
    "react-hooks"
  ]
}