# @webhandle/material-icons
Some basic support for google's material icon set


clone the source at:

git clone https://github.com/google/material-design-icons/


Documentation at:

https://developers.google.com/fonts/docs/material_icons


Overview of icons at:

https://fonts.google.com/icons?selected=Material+Icons

## Install

```bash
npm i @webhandle/material-icons
```

## Usage


### Server Side

```js
import setupMaterialIcons from "@webhandle/material-icons/initialize-webhandle-component.mjs"
let managerMaterialIcons = await setupMaterialIcons(webhandle)
```

This will provide resources on every request by default. To actuall use the styles and icons, you have to either do something
like this on the page:

```html
<script type="module">
	import {loadMaterialIcons} from "@webhandle/material-icons"
	await loadMaterialIcons()
</script>
```

Or have them included on the server side like:
```js
webhandle.routers.preDynamic.use((req, res, next) => {
	manager.addExternalResources(res.locals.externalResourceManager)
	next()
})

```


### HTML

Super simple. Just create an element like this.

```html
	<span class="material-icons">face</span>
```


### Build the styles into your stylesheet

The best way is just build the couple styles you need by including the less
stylesheet from the package. If you do that, you DO NOT need to do the 
"load dynamically" steps from below.

Include in your less files like:

```less
@import "../node_modules/@webhandle/material-icons/public/css/material-icon.css";
```

That should resolve to the global location without duplicates so long as it doesn't install
into the the sub package as well.

Or with a script tag on page like:

```html
<script type="module" src="/@webhandle/material-icons/files/js/load-styles.mjs"></script>
```
