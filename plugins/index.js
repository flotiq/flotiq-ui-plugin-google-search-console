import { registerFn } from "../common/plugin-element-cache";
import pluginInfo from "../plugin-manifest.json";
import cssString from "inline:./styles/style.css";
import { handleGridPlugin } from "./grid-renderers";

registerFn(pluginInfo, (handler, client) => {
  /**
   * Add plugin styles to the head of the document
   */
  if (!document.getElementById(`${pluginInfo.id}-styles`)) {
    const style = document.createElement("style");
    style.id = `${pluginInfo.id}-styles`;
    style.textContent = cssString;
    document.head.appendChild(style);
  }

  handler.on("flotiq.grid.cell::render", (data) =>
    handleGridPlugin(data, client, pluginInfo),
  );
});
