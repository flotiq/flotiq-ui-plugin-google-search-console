import { registerFn } from '../common/plugin-element-cache';
import pluginInfo from '../plugin-manifest.json';
import cssString from 'inline:./styles/style.css';
import { handleManageSchema } from './manage';
import { handleFormSidebar } from './form-config';
import i18n from 'i18next';

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

  handler.on('flotiq.plugins.manage::form-schema', ({ contentTypes }) =>
    handleManageSchema(contentTypes),
  );

  /**
   * Extend the Content Object forms with GSC sidebar panel
   */
  handler.on('flotiq.form.sidebar-panel::add', (data) => {
    return handleFormSidebar(data, getPluginSettings);
  });

  handler.on('flotiq.language::changed', ({ language }) => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  });
});
