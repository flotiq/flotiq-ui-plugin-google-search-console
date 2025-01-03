import {getSchema} from "./lib/form-schema";
import {getValidator} from "./lib/validator";
import {getValidFields} from "../../common/valid-fields";

export const handleManageSchema = (contentTypes) => {

  const validFields = getValidFields(contentTypes);

  const ctds = contentTypes
    ?.filter(({internal}) => !internal)
    .map(({name, label}) => ({value: name, label}));

  return {
    options: {
      disbaledBuildInValidation: true,
      onValidate: getValidator(validFields.fieldKeys),
    },
    schema: getSchema(ctds)
  }
};
