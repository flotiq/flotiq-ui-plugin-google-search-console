import i18n from '../../../i18n';
import pluginInfo from '../../../plugin-manifest.json';

export const getSchema = (contentTypes) => ({
  id: pluginInfo.id,
  name: pluginInfo.id,
  label: pluginInfo.name,
  internal: false,
  workflowId: 'generic',
  schemaDefinition: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/AbstractContentTypeSchemaDefinition',
      },
      {
        type: 'object',
        properties: {
          config: {
            type: 'array',
            items: {
              type: 'object',
              required: ['site_url', 'content_type', 'route', 'sitemap'],
              properties: {
                site_url: {
                  type: 'string',
                  minLength: 1,
                },
                content_type: {
                  type: 'string',
                  minLength: 1,
                },
                route: {
                  type: 'string',
                  minLength: 1,
                },
                sitemap: {
                  type: 'string',
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
    order: ['config'],
    propertiesConfig: {
      config: {
        items: {
          order: ['content_type', 'site_url', 'route', 'sitemap'],
          propertiesConfig: {
            site_url: {
              label: i18n.t('SiteUrl'),
              unique: false,
              helpText: i18n.t('SiteUrlHelpText'),
              inputType: 'text',
            },
            sitemap: {
              label: i18n.t('SitemapURL'),
              unique: false,
              helpText: i18n.t('SitemapURLHelpText'),
              inputType: 'text',
            },
            route: {
              label: i18n.t('Route'),
              unique: false,
              helpText: i18n.t('RouteHelpText'),
              inputType: 'text',
            },
            content_type: {
              label: i18n.t('ContentType'),
              unique: false,
              helpText: '',
              isMultiple: false,
              inputType: 'select',
              optionsWithLabels: contentTypes,
              useOptionsWithLabels: true,
            },
          },
        },
        label: i18n.t('Config'),
        unique: false,
        helpText: '',
        inputType: 'object',
      },
    },
  },
});
