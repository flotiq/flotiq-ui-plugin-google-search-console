import pluginInfo from "../../plugin-manifest.json";
import { handlePluginFormConfig } from "./plugin-form";

import {
  addElementToCache,
  getCachedElement,
} from "../../common/plugin-element-cache.js";
import axios from "axios";

export const handleFormSidebar = (data, getPluginSettings) => {
  if (
    data.contentType?.id === pluginInfo.id &&
    data.contentType?.nonCtdSchema &&
    data.name
  ) {
    return handlePluginFormConfig(data);
  }

  const pluginSettings = getPluginSettings();
  const parsedSettings = JSON.parse(pluginSettings || "{}");

  const contentTypeSettings = parsedSettings?.config?.find(
    ({ content_type }) => content_type === data?.contentType?.name,
  );

  if (!contentTypeSettings) return;
  if (!data.contentObject) return;

  return createSidebar(data.contentObject, contentTypeSettings);
};

export const createSidebar = (contentObject, contentTypeSettings) => {
  // return early if contentObject slug is not available
  if (!contentObject?.slug) return;

  const objectId = contentObject?.id;
  const containerCacheKey = `${pluginInfo.id}-${objectId || "new"}-gsc-sidebar`;
  let gscCheckContainer = getCachedElement(containerCacheKey)?.element;

  const { site_url, route } = contentTypeSettings;

  if (!gscCheckContainer) {
    // Prepare the container
    gscCheckContainer = document.createElement("div");
    gscCheckContainer.setAttribute("id", "gsc-check");

    gscCheckContainer.classList.value =
      "rounded-lg bg-white dark:bg-slate-950 relative h-fit py-5 px-4 order-30";
    gscCheckContainer.innerHTML = `<h4>Indexing status</h4>`;

    let url = route.replace(
      /{(\w+)}/g,
      (_, field) => contentObject[field] || "",
    );
    url = url.replace(/\/+/g, "/"); // Ensure no multiple slashes in the URL
    const fullUrl = `${site_url}${url}`.replace(/([^:]\/)\/+/g, "$1");

    // Don't wait for the response to render the container (no await)
    checkIndexingStatus(fullUrl, site_url).then((status) => {
      if (status) {
        gscCheckContainer.innerHTML +=
          `<br/>${status.response.inspectionResult.indexStatusResult.coverageState}`;
        gscCheckContainer.innerHTML +=
          `<br/>Last crawl: ${status.response.inspectionResult.indexStatusResult.lastCrawlTime}`;
        gscCheckContainer.innerHTML +=
          `<br/>
           <a href="${status.response.inspectionResult.inspectionResultLink}" target="_blank">
             View in Google Search Console
           </a>`;
      } else {
        console.error("Failed to retrieve indexing status");
      }
    });

    addElementToCache(gscCheckContainer, containerCacheKey);
  }

  return gscCheckContainer;
};

/**
 *
 * Returns a response from Google Search Console API
 *
 * @param {*} url
 * @param {*} siteUrl
 * @returns object
 */
export const checkIndexingStatus = async (url, siteUrl) => {
  const apiUrl = `https://sweet-mode-19a2.cdwv.workers.dev/`;

  try {
    const response = await axios.post(apiUrl, {
      url: url,
      site: siteUrl,
    });

    if (response.data && response.data.response) {
      return response.data;
    } else {
      throw new Error("No result found");
    }
  } catch (error) {
    console.error("Error checking indexing status:", error);
    return null;
  }
};
