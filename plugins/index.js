import { registerFn } from "../common/plugin-element-cache";
import pluginInfo from "../plugin-manifest.json";
import cssString from "inline:./styles/style.css";
import { handleManageSchema } from "./manage";
import { handleFormSidebar } from "./form-config";

/**
 * Register the plugin
 */

registerFn(pluginInfo, (handler, client, globals) => {
  /**
   * Add plugin styles to the head of the document
   */
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement("style");
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;
    document.head.appendChild(style);
  }

  handler.on("flotiq.plugins.manage::form-schema", (data) =>
    handleManageSchema(data, client, globals),
  );

  /**
   * Extend the Content Object forms with GSC sidebar panel
   */
  handler.on("flotiq.form.sidebar-panel::add", (data) => {
    return handleFormSidebar(data, globals.getPluginSettings);
  });
});
