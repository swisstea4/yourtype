# YourType
A website to turn your handwriting into a font!
## How to use
You can try it out here: https://swisstea4.github.io/yourtype/

- Write out letters (capital A-Z, small a-z, numbers 0-9, punctuation, etc.)
- Your written letters will automatically be turned into an otf (OpenType Font) file, which you can download and use in supported applications.

Here's a small guide on how to use your font in applications:
### Windows
1. Download the .otf file.
2. Double-click the file to open the font preview.
3. Click Install at the top.
The font is now available in supported applications such as Microsoft Word and PowerPoint.

### Linux
#### Method 1
1. Download the .otf file.
2. Open your file manager and locate the downloaded file.
3. Double click the file to open it in your font viewer.
4. Click install if available.

#### Method 2
1. Open a terminal.
2. Run these commands:

```text
mkdir -p ~/.local/share/fonts
cp ~/Downloads/myHandwriting.otf ~/.local/share/fonts/
fc-cache -f -v
```

The font should be available in your applications.

 ### MacOS
1. Download the .otf file.
2. Open it in fontBook.
3. Click Install Font.
The font is now available in supported applications.

### Android
The process depends on your phone manufacturer.
Note that some android devices also don't support installing custom fonts system-wide.

1. Download the .otf file.
2. Open your phone settings and look for Display, Fonts, or Font style.
3. If your phone supports importing custom fonts, select the downloaded file.
