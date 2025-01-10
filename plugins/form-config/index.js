import pluginInfo from '../../plugin-manifest.json';
import { handlePluginFormConfig } from './plugin-form';

import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';
import axios from 'axios';
import tepmlate from 'inline:../templates/template.html';

export const handleFormSidebar = (data, getPluginSettings) => {
  if (
    data.contentType?.id === pluginInfo.id &&
    data.contentType?.nonCtdSchema &&
    data.name
  ) {
    return handlePluginFormConfig(data);
  }

  const pluginSettings = getPluginSettings();
  const parsedSettings = JSON.parse(pluginSettings || '{}');

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
  const containerCacheKey = `${pluginInfo.id}-${objectId || 'new'}-gsc-sidebar`;
  let gscCheckContainer = getCachedElement(containerCacheKey)?.element;

  const { site_url, route } = contentTypeSettings;

  if (!gscCheckContainer) {
    // Prepare the container
    gscCheckContainer = document.createElement('div');
    gscCheckContainer.setAttribute('id', 'gsc-check-test');

    gscCheckContainer.classList.add(
      'plugin-google-search-console__container',
      'plugin-google-search-console__container--loading',
    );
    gscCheckContainer.innerHTML = tepmlate;

    let url = route.replace(
      /{(\w+)}/g,
      (_, field) => contentObject[field] || '',
    );
    url = url.replace(/\/+/g, '/'); // Ensure no multiple slashes in the URL
    const fullUrl = `${site_url}${url}`.replace(/([^:]\/)\/+/g, '$1');

    const header = gscCheckContainer.querySelector(
      `#plugin-google-search-console-header`,
    );
    const statusSpan = gscCheckContainer.querySelector(
      `#plugin-google-search-console-status`,
    );
    const crawlDate = gscCheckContainer.querySelector(
      `#plugin-google-search-console-crawl-date`,
    );
    const link = gscCheckContainer.querySelector(
      `#plugin-google-search-console-link`,
    );
    const btn = gscCheckContainer.querySelector(
      `#plugin-google-search-console-button`,
    );

    // // Don't wait for the response to render the container (no await)
    checkIndexingStatus(fullUrl, site_url).then((status) => {
      gscCheckContainer.classList.remove(
        'plugin-google-search-console__container--loading',
      );
      if (status) {
        const { coverageState, lastCrawlTime } =
          status.response.inspectionResult.indexStatusResult;

        header.textContent = 'Indexing status';
        statusSpan.textContent = coverageState;
        crawlDate.textContent = lastCrawlTime;
        link.href = status.response.inspectionResult.inspectionResultLink;
        link.textContent = 'View in Google Search Console';
        btn.textContent = 'Request Reindexing';
      } else {
        console.error('Failed to retrieve indexing status');
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
      throw new Error('No result found');
    }
  } catch (error) {
    console.error('Error checking indexing status:', error);
    return null;
  }
};
