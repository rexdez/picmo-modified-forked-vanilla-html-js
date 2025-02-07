# PicMo JS (Vanilla JS Fork)

This is a **fork** of [PicMo](https://github.com/joeattardi/picmo) that has been modified to work seamlessly with **Vanilla JavaScript and HTML** without requiring a Node.js environment.

## 🚀 Features & Modifications

1. **Dark Theme by Default**  
   - Uses custom dark mode colors for a better user experience.
   
2. **Persistent Emoji Picker**  
   - The picker stays open after selecting an emoji, allowing multiple selections without reopening it.
   
3. **No Node.js Environment Required**  
   - Removed the dependency on `process.env.NODE_ENV`, making it more compatible with static HTML/JS deployments.

4. **Picker Position beside the trigger element**  
   - Instead of taking default position to `left-start` it takes position beside/above the trigger element

## 📦 Installation

You can include the script directly in your HTML file without any build tools.


### Manual Download
1. Download the forked version from or clone this repo [GitHub](https://github.com/rexdez/picmo-modified-forked-vanilla-html-js/).
   ```bash
    git clone https://github.com/rexdez/picmo-modified-forked-vanilla-html-js
   ```
## 🛠️ Usage

```html
...
    <script src="/static/js/picmo.js"></script>
    <script src="/static/js/picmo-popup.js"></script>
...
```

## 🎨 Customization

To modify the theme colors, update the CSS variables in the `js` file `picmo.js`:
Starting from line: `2324`
```js
const ks = `.picmo-picker .icon {
	width: 1.25em;
	height: 1em;
	fill: currentColor
}`
.....
.....

```

## 📄 License

This project follows the original PicMo [MIT License](https://github.com/joeattardi/picmo/blob/main/LICENSE).

## 🤝 Contributing

Pull requests are welcome! If you find any issues, feel free to open an issue in this repository.

## 📬 Contact

For questions or feature requests, reach out via [GitHub Issues](https://github.com/rexdez/picmo-modified-forked-vanilla-html-js/issues).

