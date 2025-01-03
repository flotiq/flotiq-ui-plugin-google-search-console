import pluginInfo from "../../../plugin-manifest.json";
import i18n from "../../../i18n";

export const getSubmitHandler =
  ({ reload, modalInstance }, client, { toast }) =>
    async (values) => {
      let close = true;

      try {
        const { body, ok } = await client["_plugin_settings"].patch(
          pluginInfo.id,
          {
            settings: JSON.stringify(values),
          },
        );
        if (!ok) {
          console.error(pluginInfo.id, "updating plugin settings", body);
          toast.error(i18n.t("SettingsUpdateError"), { duration: 5000 });
          return [values, body];
        }

        if (close) modalInstance.resolve();
        reload();
        return [body, {}];
      } catch (e) {
        console.error(pluginInfo.id, "updating catch", e);
        toast.error(i18n.t("UpdateError"), { duration: 5000 });
      }
    };
