import { getCachedElement } from "../../../common/plugin-element-cache";
import { validFieldsCacheKey } from "../../../common/valid-fields";

export const handlePluginFormConfig = ({ name, config, formik }) => {
  const { index, type } =
  name.match(/config\[(?<index>\d+)\].(?<type>\w+)/)?.groups || {};

  if (index == null || !type) return;

  if (type === "content_type") {
    config.onChange = (_, value) => {
      if (value == null) formik.setFieldValue(name, "");
      else formik.setFieldValue(name, value);

      formik.setFieldValue(`config[${index}].fields`, "");
    };
  } else if (type === "fields") {
    const fieldOptions =
      getCachedElement(validFieldsCacheKey)?.element?.fieldOptions;

    const ctd = formik.values.config[index].content_type;

    config.options = fieldOptions?.[ctd] || [];
    config.additionalHelpTextClasses = "break-normal";
  } else if (type === "default_language") {
    config.options = formik.values.config[index].languages.map((lng) => ({
      value: lng,
      label: lng,
    }));
  }
};
