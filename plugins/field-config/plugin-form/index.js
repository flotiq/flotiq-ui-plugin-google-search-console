export const handlePluginFormConfig = ({ name, config, formik }) => {
  const { index, type } =
    name.match(/config\[(?<index>\d+)\].(?<type>\w+)/)?.groups || {};

  if (index == null || !type) return;

  if (type === 'content_type') {
    config.onChange = (_, value) => {
      if (value == null) formik.setFieldValue(name, '');
      else formik.setFieldValue(name, value);

      formik.setFieldValue(`config[${index}].fields`, '');
    };
  }
};
