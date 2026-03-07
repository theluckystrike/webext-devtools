/**
 * A promise-based wrapper for chrome.devtools API.
 */
export declare class WebExtDevTools {
    /**
     * Inspected Window API
     */
    static inspectedWindow: {
        /**
         * Evaluates a JavaScript expression in the context of the inspected page.
         */
        eval: (expression: string, options?: any) => Promise<[any, any]>;
        /**
         * Reloads the inspected window.
         */
        reload: (reloadOptions?: any) => void;
    };
    /**
     * Network API
     */
    static network: {
        /**
         * Returns HAR log that contains all known network requests.
         */
        getHAR: () => Promise<any>;
        /**
         * Fired when a network request is finished and all its data are available to the extension.
         */
        onRequestFinished: (callback: (request: chrome.devtools.network.Request) => void) => void;
        /**
         * Fired when the inspected window navigates to a new page.
         */
        onNavigated: (callback: (url: string) => void) => void;
    };
    /**
     * Panels API
     */
    static panels: {
        /**
         * Creates an extension panel in the DevTools window.
         */
        create: (title: string, iconPath: string, pagePath: string) => Promise<chrome.devtools.panels.ExtensionPanel>;
        /**
         * Elements panel.
         */
        elements: {
            /**
             * Creates a pane within the extension's Elements sidebar.
             */
            createSidebarPane: (title: string) => Promise<chrome.devtools.panels.ExtensionSidebarPane>;
        };
    };
}
