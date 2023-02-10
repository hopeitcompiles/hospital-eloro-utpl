const stringSimilarity = require("string-similarity");

export const validateSimilarity = (s1, s2) => {
  return stringSimilarity.compareTwoStrings(s1.toUpperCase(), s2.toUpperCase());
};
