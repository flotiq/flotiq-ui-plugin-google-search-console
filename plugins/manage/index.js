import { getSchema } from './lib/form-schema';

export const handleManagePlugin = (contentTypes) => {
  const ctds = contentTypes
    ?.filter(({ internal }) => !internal)
    .map(({ name, label }) => ({ value: name, label }));

  return {
    schema: getSchema(ctds),
  };
};
