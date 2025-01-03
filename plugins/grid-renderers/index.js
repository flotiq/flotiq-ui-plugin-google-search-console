import { getRelationData } from "../../common/api-helpers";
import {
  addElementToCache,
  getCachedElement,
} from "../../common/plugin-element-cache";

const textColors = [
  "rgb(239 68 68)",
  "rgb(249 115 22)",
  "rgb(234 179 8)",
  "rgb(132 204 22)",
  "rgb(34 197 94)",
  "rgb(20 184 166)",
  "rgb(59 130 246)",
  "rgb(139 92 246)",
  "rgb(168 85 247)",
  "rgb(217 70 239)",
];

export function handleGridPlugin(
  { accessor, contentObject, inputType, data },
  client,
  pluginInfo,
) {
  if (!["text", "number", "datasource"].includes(inputType)) return;

  const cacheKey = `${pluginInfo.id}-${contentObject.id}-${accessor}`;

  let element = getCachedElement(cacheKey)?.element;
  if (!element) {
    element = document.createElement("div");
    element.classList.add("plugin-name-cell-renderer");
    if (inputType === "text") {
      const textColor = textColors[Math.floor(Math.random() * 10)];
      element.style.color = textColor;
      element.textContent = data;
    } else if (inputType === "number") {
      element.style.fontWeight = 900;
      element.textContent = data;
    } else {
      if (data)
        Promise.all(
          data.map((relation) =>
            getRelationData(client, relation.dataUrl).then(
              (data) =>
                data.internal?.objectTitle ||
                data.title ||
                data.name ||
                data.id,
            ),
          ),
        ).then((resultArray) => {
          const joinedData = (resultArray || []).filter((r) => !!r).join(", ");
          element.textContent = joinedData;
        });
    }
  }

  addElementToCache(element, cacheKey);

  return element;
}
