import pluginInfo from "../plugin-manifest.json";

export const getValidFields = (contentTypes) => {
  const fieldKeys = {};
  const fieldOptions = {};

  contentTypes
    ?.filter(({ internal }) => !internal)
    .map(({ name, label }) => ({ value: name, label }));

  (contentTypes || []).forEach(({ name, metaDefinition }) => {
    fieldKeys[name] = metaDefinition?.order || [];
    fieldOptions[name] = [];

    Object.entries(metaDefinition?.propertiesConfig || {}).forEach(
      ([key, value]) => {
        if (key !== "__translations")
          fieldOptions[name].push({ value: key, label: value.label });
      },
    );
  });

  return { fieldKeys, fieldOptions };
};

export const validFieldsCacheKey = `${pluginInfo.id}-form-valid-fields`;
