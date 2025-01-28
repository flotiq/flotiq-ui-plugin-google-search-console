import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        ContentType: 'Content Type',
        SiteUrl: 'Site URL',
        SiteUrlHelpText:
          'Enter full https:// URL of your website, as indexed by Google (e.g. https://flotiq.com) ' +
          ' add trailing slash for domain properties',
        SitemapURL: 'URL of your sitemap.xml',
        SitemapURLHelpText:
          'Enter the full URL of the sitemap.xml file, as submitted to Google',
        Route: 'Route',
        RouteHelpText:
          'Enter the path after Site URL, use curly braces to include field values (e.g. /blog/{slug}/)',
        Header: 'Indexing status',
        GoogleSearchConsoleLink: 'View in Google Search Console',
        RequestReindexing: 'Request reindexing',
        RequestIndexing: 'Request indexing',
        ReindexingRequested: 'Reindexing requested',
        FailedToRequestReindexing: 'Failed to request reindexing',
        lastCrawlTime: 'Last crawl: {{date}}',
        Config: 'Config',
      },
    },
    pl: {
      translation: {
        ContentType: 'Typ zawartości',
        SiteUrl: 'URL strony',
        SiteUrlHelpText:
          'Wprowadź pełny adres URL strony w formacie https://, tak jak jest indeksowany przez Google' +
          ' (np. https://flotiq.com) dodaj ukośnik końcowy dla właściwości domeny',
        SitemapURL: 'Adres pliku sitemap.xml',
        SitemapURLHelpText: 'Wprowadź URL pliku sitemap.xml',
        Route: 'Ścieżka',
        RouteHelpText:
          'Wprowadź ścieżkę po URL strony, użyj nawiasów klamrowych, aby uwzględnić wartości pól (np. /blog/{slug}/)',
        Header: 'Status indeksowania',
        GoogleSearchConsoleLink: 'Zobacz w Google Search Console',
        RequestReindexing: 'Poproś o ponowne indeksowanie',
        RequestIndexing: 'Poproś o indeksowanie',
        ReindexingRequested: 'Prośba o reindeksowanie przesłana do Google',
        FailedToRequestReindexing:
          'Wystąpił błąd podczas prośby o reindeksowanie',
        lastCrawlTime: 'Ostatnie skanowanie: {{date}}',
        Config: 'Konfiguracja',
      },
    },
  },
});

export default i18n;
