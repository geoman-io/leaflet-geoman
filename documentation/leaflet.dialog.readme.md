# Leaflet.Dialog (v1.0.4)

A dialog modal window that is resizable and positionable on the map. Some customizations have been made to the project
to suit our purposes.

[GitHub Repo](https://github.com/NBTSolutions/Leaflet.Dialog?tab=readme-ov-file)

[Check out the Demo Here](http://nbtsolutions.github.io/Leaflet.Dialog/)

## Installation:

You can include the `Leaflet.DrawArrowDialog.js` and `Leaflet.Dialog.css` (from the repo) files in your project, or you can install the package
using `npm` or `bower`. In this project the files are `src/js/Libraries/DrawArrowDialog.js` and `crs/css/dialog.css`.

```shell
# Bower:
bower install Leaflet.Dialog
```

```shell
# NPM:
npm install leaflet-dialog
```

## Adding a dialog box:

```js
// After you've set up your map and layers, add the modal window by running:
var dialog = L.control
  .dialog(options)
  .setContent('<p>Hello! Welcome to your nice new dialog box!</p>')
  .addTo(map);
```

## Working with the dialog box:

### Close the window:

```js
dialog.close();
```

### Open the window:

```js
dialog.open();
```

### Destroy the window:

```js
dialog.destroy();
```

### Reset the contents:

```js
dialog.setContent("<p>Here's some new content!</p>");
```

## Options:

| Property | Type                   | Default      | Description                                                                         |
| -------- | ---------------------- | ------------ | ----------------------------------------------------------------------------------- |
| size     | [Array][width, height] | [ 300, 300 ] | An array of the starting width and height values (in pixels).                       |
| minSize  | [Array][width, height] | [ 100, 100 ] | An array with the minimum resize width and height (in pixels).                      |
| maxSize  | [Array][width, height] | [ 350, 350 ] | An array with the maximum resize width and height (in pixels).                      |
| anchor   | [Array][top, left]     | [ 250, 250 ] | The starting point anchor location (from the upper left) in pixels.                 |
| position | [String]               | 'topleft'    | The leaflet control div to place the modal inside, as a starting reference point.   |
| initOpen | [Boolean]              | false        | Whether or not to initialize in an open state.                                      |
| resize   | [Boolean]              | false        | Whether or not to display the resize icon and allow dialog resizing.                |
| move     | [Boolean]              | true         | Whether or not to display the drag/move icon and allow the user to move the dialog. |
| close    | [Boolean]              | true         | Whether or not to display the close icon and allow the user to close the dialog.    |

## Methods:

| Method                                            | Returns | Example                           | Description                                                                               |
| ------------------------------------------------- | ------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| open()                                            | this    | dialog.open();                    | Opens the dialog window.                                                                  |
| close()                                           | this    | dialog.close();                   | Closes the dialog window.                                                                 |
| toggle()                                          | this    | dialog.toggle();                  | Toggles the dialog window between open and closed.                                        |
| isOpen()                                          | bool    | dialog.isOpen();                  | Returns the open state of the dialog window.                                              |
| destroy()                                         | this    | dialog.destroy();                 | Removes the dialog box from the window.                                                   |
| setLocation( [Array][top, left] anchor location ) | this    | dialog.setLocation( [ 15, 15 ] ); | Move the dialog box to the specified pixel location ( Relative to the 'position' option ) |
| setSize( [Array][width, height] size )            | this    | dialog.setSize( [ 150, 150 ] );   | Resize the dialog window to the specified width and height.                               |
| lock()                                            | this    | dialog.lock();                    | Hides all visible dialog window controls.                                                 |
| unlock()                                          | this    | dialog.unlock();                  | Re-instates all dialog window controls.                                                   |
| freeze()                                          | this    | dialog.freeze();                  | Hides all visible dialog window movement/sizing controls.                                 |
| unfreeze()                                        | this    | dialog.unfreeze();                | Re-instates all dialog window movement/sizing controls.                                   |
| hideClose()                                       | this    | dialog.hideClose();               | Hides the closing 'x'                                                                     |
| showClose()                                       | this    | dialog.showClose();               | Shows the closing 'x'                                                                     |
| hideResize()                                      | this    | dialog.hideResize();              | Hides the resizing symbol                                                                 |
| showResize()                                      | this    | dialog.showResize();              | Shows the resizing symbol                                                                 |

## Events:

| Event               | Data | Description                                              |
| ------------------- | ---- | -------------------------------------------------------- |
| dialog:opened       | this | Fired when open() is called.                             |
| dialog:closed       | this | Fired when close() is called or when the 'x' is clicked. |
| dialog:destroyed    | this | Fired when destroy() is called.                          |
| dialog:locked       | this | Fired when lock() is called.                             |
| dialog:unlocked     | this | Fired when unlock() is called.                           |
| dialog:frozen       | this | Fired when freeze() is called.                           |
| dialog:unfrozen     | this | Fired when unfreeze() is called.                         |
| dialog:updated      | this | Fired when contents are set or when added to the map.    |
| dialog:resizestart  | this | Fired when the resize button is clicked.                 |
| dialog:resizing     | this | Fired continuously as the resize button is dragged.      |
| dialog:resizeend    | this | Fired when the resize button click is released.          |
| dialog:movestart    | this | Fired when the move button is clicked.                   |
| dialog:moving       | this | Fired continuously as the move button is dragged.        |
| dialog:moveend      | this | Fired when the move button click is released.            |
| dialog:closehidden  | this | Fired when hideClose() is called.                        |
| dialog:closeshown   | this | Fired when the showClose() is called.                    |
| dialog:resizehidden | this | Fired when hideResize() is called.                       |
| dialog:resizeshown  | this | Fired when the showResize() is called.                   |
