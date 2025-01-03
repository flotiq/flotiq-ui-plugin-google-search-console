[[_TOC_]]

# Google Search Console integration plugin

## Overview
This plugin integrates with the Google Search Console API to provide up-to-date information about indexing status of your pages.


## Configuration Steps

> Important: you need to invite the user `gsc-86@flotiq-main-project.iam.gserviceaccount.com` to your Google Search Console property for this to work.

1. Go to your Flotiq UI and select `Plugins` from the left side menu.
2. Find the `Google Search Console` plugin and enable it, wait for the UI to reload.
3. Click `Manage` and then `Add item` in the configuration window.
4. Select the Content Type, where you want to configure the plugin.
5. Provide the Site URL that you have in Google Search Console, for domain properties add a trailing slash at the end.
6. Define a route for the pages, use curly braces, e.g. /blog/{slug}/

## Using the plugin

1. Once the plugin is configured - go to the configured Content Type and edit one of the objects.
2. Google index status will display in the right sidebar after a moment.

## Development

### Quick start

1. `yarn` - to install dependencies
2. `yarn start` - to start development mode - rebuild on file modifications
3. update your `plugin-manifest.json` file to contain the production URL and other plugin information
4. `yarn build` - to build plugins

### Dev environment

Dev environment is configured to use:

* `prettier` - best used with automatic format on save in IDE
* `eslint` - it is built into both `start` and `build` commands

### Output

The plugins are built into a single `dist/index.js` file. The manifest is copied to `dist/plugin-manifest.json` file.

### Deployment

<!-- TO DO -->

### Loading the plugin

**Warning:** While developing, you can use  `https://localhost:3053/plugin-manifest.json` address to load the plugin manifest. Make sure your browser trusts the local certificate on the latter, to be able to use it e.g. with `https://editor.flotiq.com`

#### URL

**Hint**: You can use localhost url from development mode `https://localhost:3053/index.js`

1. Open Flotiq editor
2. Open Chrome Dev console
3. Execute the following script
   ```javascript
   FlotiqPlugins.loadPlugin('plugin-id', '<URL TO COMPILED JS>')
   ```
4. Navigate to the view that is modified by the plugin

#### Directly

1. Open Flotiq editor
2. Open Chrome Dev console
3. Paste the content of `dist/index.js`
4. Navigate to the view that is modified by the plugin

#### Deployment

**Hint**: You can use localhost url from development mode `https://localhost:3053/plugin-manifest.json`

1. Open Flotiq editor
2. Add a new plugin and paste the URL to the hosted `plugin-manifest.json` file
3. Navigate to the view that is modified by the plugin
