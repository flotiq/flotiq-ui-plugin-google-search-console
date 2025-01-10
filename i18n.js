import i18n from "i18next";

i18n.init({
  fallbackLng: "en",
  supportedLngs: ["en", "pl"],
  resources: {
    en: {
      translation: {
        ContentType: "Content Type",
        //@todo add tranlations
      },
    },
    pl: {
      translation: {
        ContentType: "Typ zawartości",
      },
    },
  },
});

export default i18n;
