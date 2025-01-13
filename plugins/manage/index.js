import { getSchema } from './lib/form-schema';
import { getValidator } from './lib/validator';

export const handleManageSchema = (contentTypes) => {
  const ctds = contentTypes
    ?.filter(({ internal }) => !internal)
    .map(({ name, label }) => ({ value: name, label }));

  return {
    options: {
      disbaledBuildInValidation: true,
      onValidate: getValidator,
    },
    schema: getSchema(ctds),
  };
};
