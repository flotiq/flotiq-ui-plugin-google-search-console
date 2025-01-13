import i18n from '../../../i18n';

const addToErrors = (errors, index, field, error) => {
  if (!errors.config) errors.config = [];
  if (!errors.config[index]) errors.config[index] = {};
  errors.config[index][field] = error;
};

export const getValidator = (values) => {
  const errors = {};

  values.config?.forEach((ctdConfig, index) => {
    const requiredFields = ['content_type', 'site_url', 'route'];

    for (const field of requiredFields) {
      const value = ctdConfig[field];
      if (!value || (Array.isArray(value) && !value.length)) {
        addToErrors(errors, index, field, i18n.t('FieldRequired'));
      }
    }
  });

  return errors;
};
