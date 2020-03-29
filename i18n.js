const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
	defaultLanguage: "en",
	otherLanguages: ["es"]
});

module.exports = NextI18NextInstance;
