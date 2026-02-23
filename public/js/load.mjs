
let loaded = false

import config from "@webhandle/material-icons/configuration"
export async function loadMaterialIcons() {
	if(!loaded) {
		loaded = true

		function test() {
			let d = document.createElement('div');
			d.classList.add('material-icons-styles-marker');
			document.body.appendChild(d);
			let content = window.getComputedStyle(d).content;
			
			if(content.indexOf('loaded') < 0) {
				document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${config.publicFilesPrefix}/css/material-icons.css">`);
			}
			d.remove();
		};
		if(document.body) {
			test();
		}
		else {
			document.addEventListener("DOMContentLoaded", test);
		}

	}

}
