import i18n from "../../../i18n";
import pluginInfo from "../../../plugin-manifest.json";

export const getSchema = (contentTypes) => ({
  id: pluginInfo.id,
  name: pluginInfo.id,
  label: pluginInfo.name,
  internal: false,
  workflowId: "generic",
  schemaDefinition: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/AbstractContentTypeSchemaDefinition",
      },
      {
        type: "object",
        properties: {
          config: {
            type: "array",
            items: {
              type: "object",
              required: ["api_key", "site_url", "content_type", "route"],
              properties: {
                site_url: {
                  type: "string",
                  minLength: 1,
                },
                content_type: {
                  type: "string",
                  minLength: 1,
                },
                route: {
                  type: "string",
                  minLength: 1,
                },
              },
            },
          },
        },
      },
    ],
    required: [],
    additionalProperties: false,
  },
  metaDefinition: {
    order: ["config"],
    propertiesConfig: {
      config: {
        items: {
          order: ["content_type", "site_url", "route"],
          propertiesConfig: {
            site_url: {
              label: i18n.t("Site URL"),
              unique: false,
              helpText:
                "Enter full https:// URL of your website, as indexed by Google (e.g. https://flotiq.com)" +
                " add trailing slash for domain properties",
              inputType: "text",
            },
            route: {
              label: i18n.t("Route"),
              unique: false,
              helpText:
                "Enter the path after Site URL, use curly braces to include field values (e.g. /blog/{slug}/)",
              inputType: "text",
            },
            content_type: {
              label: i18n.t("ContentType"),
              unique: false,
              helpText: "",
              isMultiple: false,
              inputType: "select",
              optionsWithLabels: contentTypes,
              useOptionsWithLabels: true,
            },
          },
        },
        label: "config",
        unique: false,
        helpText: "",
        inputType: "object",
      },
    },
  },
});
