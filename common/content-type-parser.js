import { showWarningModal } from "./warning-modal";

export const getCtdsToRemove = async (
  currentConfig,
  contentTypesAcc,
  openModal,
  initialSettings = null,
) => {
  let ctdRemoved = currentConfig;

  if (initialSettings) {
    ctdRemoved = (initialSettings?.config || []).filter(
      ({ content_type }) =>
        !currentConfig.find(
          ({ content_type: currentContentType }) =>
            currentContentType === content_type,
        ),
    );
  }

  if (!ctdRemoved.length) return [];

  const removeTranslations = await showWarningModal(
    ctdRemoved
      .map(
        ({ content_type }) =>
          contentTypesAcc[content_type]?.label || content_type,
      )
      .join(", "),
    openModal,
  );

  if (!removeTranslations) return [];
  return ctdRemoved;
};

export const getUpdateData = (config, contentTypesAcc, remove = false) =>
  config.map(({ content_type, fields, default_language }) => {
    const ctd = contentTypesAcc[content_type];
    const ctdClone = JSON.parse(JSON.stringify(ctd));

    if (remove) removeTranslationsFromContetType(ctdClone);
    else addTranslationsToContentType(ctdClone, fields, default_language);

    return { ctd, ctdClone };
  });

const removeTranslationsFromContetType = (contentType) => {
  contentType.metaDefinition.order = contentType.metaDefinition.order.filter(
    (name) => name !== "__translations",
  );
  delete contentType.metaDefinition.propertiesConfig.__translations;

  contentType.schemaDefinition.required =
    contentType.schemaDefinition.required.filter(
      (name) => name !== "__translations",
    );
  delete contentType.schemaDefinition.allOf[1].properties.__translations;
};

const addTranslationsToContentType = async (
  contentType,
  fieldKeys,
  defaultLanguage,
) => {
  const translationPropertiesConfig = fieldKeys.reduce((config, key) => {
    config[key] = contentType.metaDefinition.propertiesConfig[key];
    return config;
  }, {});

  contentType.metaDefinition.propertiesConfig.__translations = {
    helpText: "",
    inputType: "object",
    label: "Translations",
    unique: false,
    hidden: true,
    items: {
      order: [
        ...contentType.metaDefinition.order.filter((key) =>
          fieldKeys.includes(key),
        ),
        "__language",
      ],
      propertiesConfig: {
        ...translationPropertiesConfig,
        __language: {
          label: "Language",
          unique: false,
          helpText: "",
          inputType: "text",
        },
      },
    },
  };

  if (!contentType.metaDefinition.order.includes("__translations")) {
    contentType.metaDefinition.order.push("__translations");
  }

  const translationProperties = fieldKeys.reduce((config, key) => {
    config[key] = contentType.schemaDefinition.allOf[1].properties[key];
    return config;
  }, {});

  const requiredFields = contentType.schemaDefinition.required;

  contentType.schemaDefinition.allOf[1].properties.__translations = {
    type: "array",
    items: {
      type: "object",
      required: [
        ...requiredFields.filter((key) => fieldKeys.includes(key)),
        "__language",
      ],
      properties: {
        ...translationProperties,
        __language: {
          type: "string",
          minLength: 1,
          default: defaultLanguage,
        },
      },
    },
  };
};
