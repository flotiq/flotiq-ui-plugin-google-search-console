import pluginInfo from '../../plugin-manifest.json';

import {
  addElementToCache,
  getCachedElement,
} from '../../common/plugin-element-cache.js';
import axios from 'axios';
import template from 'inline:../templates/template.html';
import i18n from 'i18next';
import moment from 'moment';

export const handleSidebarAdd = (data, getPluginSettings) => {
  const pluginSettings = getPluginSettings();
  const parsedSettings = JSON.parse(pluginSettings || '{}');

  const contentTypeSettings = parsedSettings?.config?.find(
    ({ content_type }) => content_type === data?.contentType?.name,
  );

  if (!contentTypeSettings) return;
  if (!data.contentObject) return;

  return createSidebar(data.contentObject, contentTypeSettings);
};

const createSidebar = (contentObject, contentTypeSettings) => {
  // return early if contentObject slug is not available
  if (!contentObject?.slug) return;

  const objectId = contentObject?.id;
  const containerCacheKey = `${pluginInfo.id}-${objectId || 'new'}-gsc-sidebar`;
  let gscCheckContainer = getCachedElement(containerCacheKey)?.element;

  const { site_url, route, sitemap } = contentTypeSettings;

  if (!gscCheckContainer) {
    // Prepare the container
    gscCheckContainer = document.createElement('div');
    gscCheckContainer.setAttribute('id', 'gsc-check-test');

    gscCheckContainer.classList.add(
      'plugin-google-search-console__container',
      'plugin-google-search-console__container--loading',
    );
    gscCheckContainer.innerHTML = template;

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
      if (status) {
        gscCheckContainer.classList.remove(
          'plugin-google-search-console__container--loading',
        );

        header.textContent = i18n.t('Header');

        statusSpan.textContent =
          status.response.inspectionResult.indexStatusResult.coverageState;

        parseStatusSpan(
          statusSpan,
          status.response.inspectionResult.indexStatusResult.indexingState,
        );

        crawlDate.textContent = i18n.t('lastCrawlTime', {
          date: moment(
            status.response.inspectionResult.indexStatusResult.lastCrawlTime,
          ).format('YYYY-MM-DD | H:mm:ss'),
        });

        link.href = status.response.inspectionResult.inspectionResultLink;

        link.textContent = i18n.t('GoogleSearchConsoleLink');

        btn.textContent = i18n.t('RequestReindexing');
        btn.addEventListener('click', async () => {
          const response = await triggerSitemapRefresh(
            fullUrl,
            site_url,
            sitemap,
          );

          if (response) {
            alert(i18n.t('ReindexingRequested'));
          } else {
            alert(i18n.t('FailedToRequestReindexing'));
          }
        });
      } else {
        console.error('Failed to retrieve indexing status');
      }
    });

    addElementToCache(gscCheckContainer, containerCacheKey);
  }

  return gscCheckContainer;
};

const parseStatusSpan = (container, indexingStatus) => {
  const iconClass = {
    INDEXING_ALLOWED: 'plugin-google-search-console__status--indexed',
    NOT_INDEXED: 'plugin-google-search-console__status--duplicate',
    INDEXING_STATE_UNSPECIFIED: 'plugin-google-search-console__status--warning',
  };

  container.classList.add(iconClass[indexingStatus]);
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

/**
 *
 * Trigger refresh of sitemap via Google API
 *
 * @param {*} url
 * @param {*} siteUrl
 * @param {*} sitemapUrl
 * @returns object
 */
export const triggerSitemapRefresh = async (url, siteUrl, sitemapUrl) => {
  const apiUrl = `https://sweet-mode-19a2.cdwv.workers.dev/`;

  try {
    const response = await axios.put(apiUrl, {
      url: url,
      site: siteUrl,
      sitemap: sitemapUrl,
    });
    console.log(response);
    if (response.data == 'OK') {
      return true;
    } else {
      throw new Error('Error triggering sitemap refresh');
    }
  } catch (error) {
    console.error('Error triggering sitemap refresh:', error);
    return null;
  }
};
