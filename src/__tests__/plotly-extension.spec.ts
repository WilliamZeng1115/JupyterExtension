import { JupyterFrontEnd } from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';

import plugin from '../index';

describe('plotly-extension', () => {
  let app: JupyterFrontEnd;
  let palette: ICommandPalette;
  let launcher: ILauncher;

  beforeEach(() => {
    app = {
      commands: {
        addCommand: jest.fn()
      }
    } as unknown as JupyterFrontEnd;

    palette = {
      addItem: jest.fn()
    } as unknown as ICommandPalette;

    launcher = {
      add: jest.fn()
    } as unknown as ILauncher;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('activate', () => {
    it('should add command to palette', () => {
      plugin.activate(app, palette, launcher);

      expect(palette.addItem).toHaveBeenCalled();
    });

    it('should add command to app', () => {
      plugin.activate(app, palette, launcher);

      expect(app.commands.addCommand).toHaveBeenCalled();
    });

    it('should add launcher item if launcher is available', () => {
      plugin.activate(app, palette, launcher);

      expect(launcher.add).toHaveBeenCalled();
    });
  });
});
