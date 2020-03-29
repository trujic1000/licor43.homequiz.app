const NextI18Next = require("next-i18next").default;

const lanaguages = ["en", "es"];

const instance = new NextI18Next({
	localePath: "public/static/locales",
	preload: ["en"],
	defaultLanguage: "en",
	otherLanguages: ["es"],
	fallbackLng: "en"
});

instance.i18n.lanaguages = lanaguages;

module.exports = instance;
