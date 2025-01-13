import { registerFn } from '../common/plugin-element-cache';
import pluginInfo from '../plugin-manifest.json';
import cssString from 'inline:./styles/style.css';
import { handleManagePlugin } from './manage';
import { handleSidebarAdd } from './sidebar-add/index.js';
import i18n from 'i18next';
import { handlePluginFormConfig } from './field-config/plugin-form/index.js';

/**
 * Register the plugin
 */

registerFn(pluginInfo, (handler, _, { getPluginSettings, getLanguage }) => {
  /**
   * Add plugin styles to the head of the document
   */
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement('style');
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;
    document.head.appendChild(style);
  }

  const language = getLanguage();
  if (language !== i18n.language) {
    i18n.changeLanguage(language);
  }

  handler.on('flotiq.form.field::config', (data) => {
    if (
      data.contentType?.id === pluginInfo.id &&
      data.contentType?.nonCtdSchema &&
      data.name
    ) {
      return handlePluginFormConfig(data);
    }
  });

  handler.on('flotiq.plugins.manage::form-schema', ({ contentTypes }) =>
    handleManagePlugin(contentTypes),
  );

  handler.on('flotiq.form.sidebar-panel::add', (data) => {
    return handleSidebarAdd(data, getPluginSettings);
  });

  handler.on('flotiq.language::changed', ({ language }) => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  });
});
