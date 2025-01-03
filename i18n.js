import i18n from "i18next";

i18n.init({
  fallbackLng: "en",
  supportedLngs: ["en", "pl"],
  resources: {
    en: {
      translation: {
        ContentType: "Content Type",
        ContentTypeUpdateError:
          "Cannot update {{name}} Content Type Definition. Please, try again later.",
        DefaultLanguage: "Domyślny język",
        DeleteTranslations: {
          Content:
            "Do you want to also remove the translation field for the Content Types: <strong>{{types}}</strong>? " +
            "This will delete all previously entered translated data for these types. " +
            "This action is irreversible. \n\n" +
            "If you do not agree, you can do this manually later by editing the Content Type Definitions.",
          Keep: "Keep translation fields",
          Remove: "Remove translation fields and data",
          Title: "Do you want to remove translation fields?",
        },
        FieldRequired: "Field is required",
        Fields: "Content type fields to translate",
        Languages: "Available languages",
        MinLanguages: "You have to add at least 2 langugages",
        NoTranslations:
          "Could not find translation field for this Content Type. " +
          "Go to multilingual plugin settings and try to reconfigure plugin.",
        RemoveError:
          "Sorry, there was a problem deleting your data. " +
          "Please go to the edit content type definition page and delete it manually.",
        SettingsUpdateError:
          "Cannot update plugin settings. Please try again later.",
        UpdateError:
          "Error occurred while connecting to the server, please try again later.",
        Warning: "Warning!",
        WrongField:
          "This field type is not supported or content type does not have this field",
      },
    },
    pl: {
      translation: {
        ContentType: "Typ zawartości",
        ContentTypeUpdateError:
          "Coś poszło nie tak podczas aktualizacji definicji typu {{name}}. Spróbuj ponownie później.",
        DefaultLanguage: "Default language",
        DeleteTranslations: {
          Content:
            "Czy chcesz usunąć również pole związane z tłumaczeniami dla definitcji typów: " +
            "<strong>{{types}}</strong>? " +
            "Spowoduje to usunięcie wszystkich wcześniej wprowadzonych przetłumaczonych danych dla tych typów. " +
            "Ta akcja jest nieodwracalna. \n\n" +
            "Jeśli się nie zgodzisz, będziesz mógł zrobić to później ręcznie poprzez edycję definicji typu.",
          Keep: "Zachowaj pola tłumaczeń",
          Remove: "Usuń pola tłumaczeń i dane",
          Title: "Czy chcesz usunąć pola tłumaczeń?",
        },
        FieldRequired: "Pole jest wymagane",
        Fields: "Pola typu zawartości do przetłumaczenia",
        Languages: "Dostępne języki",
        MinLanguages: "Musisz dodać co najmniej dwa języki",
        NoTranslations:
          "Nie udało się znaleźć pola z tłumaczeniami. " +
          "Przejdź do ustawień wtyczki multilingual i spróbuj ponownie ją skonfigurować.",
        RemoveError:
          "Przepraszamy, wystąpił problem podczas usuwania Twoich danych. " +
          "Proszę, przejdź do strony edycji definicji typu zawartości i usuń je ręcznie.",
        SettingsUpdateError:
          "Coś poszło nie tak podczas aktualizacji ustawień plugin. Spróbuj ponownie później",
        UpdateError:
          "Wystąpił błąd połączenia z serwerem, spróbuj ponownie później.",
        Warning: "Uwaga!",
        WrongField:
          "Ten typ pola nie jest wspierany lub typ zawartości już go nie zawiera",
      },
    },
  },
});

export default i18n;
