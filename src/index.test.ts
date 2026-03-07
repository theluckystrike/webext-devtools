import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebExtDevTools } from './index';

describe('WebExtDevTools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    global.chrome = {
      devtools: {
        inspectedWindow: {
          eval: vi.fn(),
          reload: vi.fn(),
        },
        network: {
          getHAR: vi.fn(),
          onRequestFinished: { addListener: vi.fn() },
          onNavigated: { addListener: vi.fn() },
        },
        panels: {
          create: vi.fn(),
          elements: {
            createSidebarPane: vi.fn(),
          },
        },
      },
    };
  });

  it('should evaluate expression in inspected window', async () => {
    const mockResult = { foo: 'bar' };
    (chrome.devtools.inspectedWindow.eval as any).mockImplementation((expr: any, opts: any, cb: any) => cb(mockResult, null));
    const [result, exception] = await WebExtDevTools.inspectedWindow.eval('1+1');
    expect(chrome.devtools.inspectedWindow.eval).toHaveBeenCalledWith('1+1', undefined, expect.any(Function));
    expect(result).toEqual(mockResult);
    expect(exception).toBeNull();
  });

  it('should reload inspected window', () => {
    WebExtDevTools.inspectedWindow.reload({ ignoreCache: true });
    expect(chrome.devtools.inspectedWindow.reload).toHaveBeenCalledWith({ ignoreCache: true });
  });

  it('should get HAR log', async () => {
    const mockHar = { version: '1.2' };
    (chrome.devtools.network.getHAR as any).mockImplementation((cb: any) => cb(mockHar));
    const result = await WebExtDevTools.network.getHAR();
    expect(result).toEqual(mockHar);
  });

  it('should add listener to onRequestFinished', () => {
    const cb = vi.fn();
    WebExtDevTools.network.onRequestFinished(cb);
    expect(chrome.devtools.network.onRequestFinished.addListener).toHaveBeenCalledWith(cb);
  });

  it('should add listener to onNavigated', () => {
    const cb = vi.fn();
    WebExtDevTools.network.onNavigated(cb);
    expect(chrome.devtools.network.onNavigated.addListener).toHaveBeenCalledWith(cb);
  });

  it('should create panel', async () => {
    const mockPanel = { onShown: {} };
    (chrome.devtools.panels.create as any).mockImplementation((t: any, i: any, p: any, cb: any) => cb(mockPanel));
    const result = await WebExtDevTools.panels.create('Test', 'icon.png', 'page.html');
    expect(chrome.devtools.panels.create).toHaveBeenCalledWith('Test', 'icon.png', 'page.html', expect.any(Function));
    expect(result).toEqual(mockPanel);
  });

  it('should create sidebar pane', async () => {
    const mockPane = { setPage: vi.fn() };
    (chrome.devtools.panels.elements.createSidebarPane as any).mockImplementation((t: any, cb: any) => cb(mockPane));
    const result = await WebExtDevTools.panels.elements.createSidebarPane('Sidebar');
    expect(chrome.devtools.panels.elements.createSidebarPane).toHaveBeenCalledWith('Sidebar', expect.any(Function));
    expect(result).toEqual(mockPane);
  });

  it('should handle evaluation exceptions', async () => {
    const mockException = { isError: true, description: 'err' };
    (chrome.devtools.inspectedWindow.eval as any).mockImplementation((expr: any, opts: any, cb: any) => cb(null, mockException));
    const [result, exception] = await WebExtDevTools.inspectedWindow.eval('invalid');
    expect(result).toBeNull();
    expect(exception).toEqual(mockException);
  });

  it('should call reload with no options', () => {
    WebExtDevTools.inspectedWindow.reload();
    expect(chrome.devtools.inspectedWindow.reload).toHaveBeenCalledWith(undefined);
  });

  it('should handle getHAR with empty result', async () => {
    (chrome.devtools.network.getHAR as any).mockImplementation((cb: any) => cb({}));
    const result = await WebExtDevTools.network.getHAR();
    expect(result).toEqual({});
  });
});
