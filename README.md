# SCT Toggle 

A Cinnamon Applet commonly used in Linux Mint to toggle through color temperatures.

## Install from this repo
1. Install `sct` with your favorite package management or by the terminal command `sudo apt install sct` . This command line tool 
sets the screen temperature easily with `sct 5000`
1. Download the code from here.
1. Copy the "sct@skulptist.de" directory to ~/.local/share/cinnamon/applets .
1. Open the Mint Menu, search for "Applets" and open the applet configuration app.
1. Add the applet to your screen by searching for `sct@skulptist.de`, select it and press the + button to add it.

## Install from the official repo
Go to the applets app, search sct, download the widget and activate it.

Don't forget to give a [star for the applet](https://cinnamon-spices.linuxmint.com/applets/view/389) ;-)

You have to install `sct` seperatly with `sudo apt install sct` or your favorite app store. It does not get shipped with the applet.

## Usage
Color temperature steps at 4000K, 5500K and 6500K are predefined. Just click on the Applet Icon to 
select the next one. 

You can define your favorite color steps in the applet settings by right clicking the applet and
choose setup. Add up to 7 steps with Values between 1000 and 10000, where 1000 is red, 6500 is daylight
and 10000 is very blue.

If the app icon is not the one you want to use, change it in the settings and select another one from the
gtk icon library.

## Development hints

At the moment the Applet gets developed in this Repo: https://github.com/Matthias-Hermsdorf/cinnamon-sct-applet and versions get copied to the Main repo. Perhaps I change that and use a branche in my fork. 

make a soft link from the repo to ~/.locale/share/cinnamon/applets to have the code in your custom projects folder, but make it available for the cinnamon applets runtime.

After changing code restart the applet with this command:
```
dbus-send --session --dest=org.Cinnamon.LookingGlass 
--type=method_call /org/Cinnamon/LookingGlass org.Cinnamon.
LookingGlass.ReloadExtension string:'sct@skulptist.de' string:'APPLET'
```

make Strings translateable with the _ function of the translation.js
After that generate a pot file through
```
cinnamon-xlet-makepot .
```
and edit the po translations with the app poedit

After modifing the po translations use
```
cinnamon-xlet-makepot -i .
```
to make the translations available in the applet. Could be necessary to reload the applet with the dbus-send command above.

