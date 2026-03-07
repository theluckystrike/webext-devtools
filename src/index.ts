/**
 * A promise-based wrapper for chrome.devtools API.
 */
export class WebExtDevTools {
  /**
   * Inspected Window API
   */
  static inspectedWindow = {
    /**
     * Evaluates a JavaScript expression in the context of the inspected page.
     */
    eval: (expression: string, options?: any): Promise<[any, any]> => {
      return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(expression, options as any, (result, exception) => {
          resolve([result, exception]);
        });
      });
    },
    /**
     * Reloads the inspected window.
     */
    reload: (reloadOptions?: any): void => {
      chrome.devtools.inspectedWindow.reload(reloadOptions as any);
    }
  };

  /**
   * Network API
   */
  static network = {
    /**
     * Returns HAR log that contains all known network requests.
     */
    getHAR: (): Promise<any> => {
      return new Promise((resolve) => {
        chrome.devtools.network.getHAR((harLog) => {
          resolve(harLog);
        });
      });
    },
    /**
     * Fired when a network request is finished and all its data are available to the extension.
     */
    onRequestFinished: (callback: (request: chrome.devtools.network.Request) => void): void => {
      chrome.devtools.network.onRequestFinished.addListener(callback);
    },
    /**
     * Fired when the inspected window navigates to a new page.
     */
    onNavigated: (callback: (url: string) => void): void => {
      chrome.devtools.network.onNavigated.addListener(callback);
    }
  };

  /**
   * Panels API
   */
  static panels = {
    /**
     * Creates an extension panel in the DevTools window.
     */
    create: (title: string, iconPath: string, pagePath: string): Promise<chrome.devtools.panels.ExtensionPanel> => {
      return new Promise((resolve) => {
        chrome.devtools.panels.create(title, iconPath, pagePath, (panel) => {
          resolve(panel);
        });
      });
    },
    /**
     * Elements panel.
     */
    elements: {
      /**
       * Creates a pane within the extension's Elements sidebar.
       */
      createSidebarPane: (title: string): Promise<chrome.devtools.panels.ExtensionSidebarPane> => {
        return new Promise((resolve) => {
          chrome.devtools.panels.elements.createSidebarPane(title, (pane) => {
            resolve(pane);
          });
        });
      }
    }
  };
}
