import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { showDialog, InputDialog, Dialog, ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
/**
 * Initialization data for the plotly-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'plotly-extension',
  autoStart: true,
  requires: [ICommandPalette,ILauncher],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, launcher: ILauncher) => {
    console.log('JupyterLab extension plotly-extension is activated!');

    const command: string = 'plotly-extension:open-dialog';
    palette.addItem({ command, category: 'My Extension' });

    console.log(`Creating command ${command}`);
    app.commands.addCommand(command, {
      label: 'plotly-extension',
      execute: () => {
        InputDialog.getText({
          title: 'Dialog Box',
          okLabel: 'OK'
        }).then(result => {
          const text = (result.value as string) || 'No text entered.';
          showDialog({
            title: 'Confirm Dialogue',
            body: `You entered "${text}".`,
            buttons: [Dialog.okButton()]
          });
        });
      }
    });
    console.log(`Created command ${command}`);

    console.log('Creating launch button');
    if (launcher) {
      launcher.add({
        command,
        category: 'Other',
        rank: 0
      });
      console.log('Launch button created');
    }
  }
};

export default plugin;
