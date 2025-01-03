import pluginInfo from "../plugin-manifest.json";
import { addElementToCache, getCachedElement } from "./plugin-element-cache";
import i18n from "../i18n";

const warningModalId = "plugin-multilingual-warning-modal";

const getContent = (headerText, contentText) => {
  const modalContentCacheKey = `${pluginInfo.id}-remove-ctd-warning`;
  let modalContent = getCachedElement(modalContentCacheKey)?.element;

  if (!modalContent) {
    modalContent = document.createElement("div");
    modalContent.className = "plugin-multilingual-remove-ctd-warning";

    modalContent.innerHTML = /* html */ `
        <h3 class="plugin-multilingual-remove-ctd-warning__heading"></h3>
        <p class="plugin-multilingual-remove-ctd-warning__content"></p>
        `;

    addElementToCache(modalContent, modalContentCacheKey);
  }

  const heading = modalContent.querySelector(
    ".plugin-multilingual-remove-ctd-warning__heading",
  );
  heading.textContent = headerText;

  const content = modalContent.querySelector(
    ".plugin-multilingual-remove-ctd-warning__content",
  );
  content.innerHTML = contentText;

  return modalContent;
};

export const showWarningModal = (types, openModal) =>
  openModal({
    id: warningModalId,
    size: "lg",
    content: getContent(
      i18n.t("DeleteTranslations.Title"),
      i18n.t("DeleteTranslations.Content", {
        types,
      }),
    ),
    hideClose: true,
    buttons: [
      {
        key: "remove",
        label: i18n.t("DeleteTranslations.Remove"),
        color: "red",
        result: true,
      },
      {
        key: "keep",
        label: i18n.t("DeleteTranslations.Keep"),
        color: "blueBordered",
        result: false,
      },
    ],
  });

export const errorModal = async (openModal) =>
  openModal({
    id: warningModalId,
    content: getContent(i18n.t("Warning"), i18n.t("RemoveError")),
    buttons: [
      {
        key: "ok",
        label: "Ok",
        color: "blue",
      },
    ],
  });
