const NextI18Next = require("next-i18next").default;

const instance = new NextI18Next({
	localePath: "public/static/locales",
	preload: ["en"],
	defaultLanguage: "en",
	otherLanguages: ["es"],
	fallbackLng: "en"
});

module.exports = instance;
