(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>

		<title>Untitled Sky II</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">
		<meta itemprop="name" content="Untitled Sky II">
		<meta itemprop="description" content="made with cables">
		<meta itemprop="image" content="screenshot.png">
		<meta name="description" content="made with cables" />

		:host {
			border-radius: 0px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		body {
			margin: 0;
			background-color: #000;
			color: #fff;
			font-family: Helvetica, Arial, sans-serif;
			overflow: hidden; /* disable scrolling / rubberband effect on mobile */
		}

		canvas {
			display: block;
			position: absolute;
			outline:0;
		}

		* {
			/* disable on touch highlights of html elements, especially on mobile! */
			-webkit-tap-highlight-color: transparent;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
		</style> 
	
		<canvas id="glcanvas" width="1000vw" height="1000vh" tabindex="1"></canvas>	
		<script type="text/javascript" src="https://sepa-novo.github.io/CBox/patch.js" async></script>
		
		<script>
	
			// disable rubberband effect on mobile devices
			document.getElementById('glcanvas').addEventListener('touchmove', (e)=>{ e.preventDefault(); }, false);
	
	
			function patchInitialized(patch) {
				// You can now access the patch object (patch), register variable watchers and so on
			}
	
			function patchFinishedLoading(patch) {
				// The patch is ready now, all assets have been loaded
			}
	
			document.addEventListener('CABLES.jsLoaded', function (event) {
				CABLES.patch = new CABLES.Patch({
					patch: CABLES.exportedPatch,
					"prefixAssetPath": "",
					"assetPath": "assets/",
					"jsPath": "js/",
					"glCanvasId": "glcanvas",
					"glCanvasResizeToWindow": true,
					"onPatchLoaded": patchInitialized,
					"onFinishedLoading": patchFinishedLoading,
					"canvas":{"alpha":true,"premultipliedAlpha":true} // make canvas transparent
				});
			});
		</script>
	`;

	class ColoredBox extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("bordercolor" in changedProperties) {
				this.style["boarder-color"] = changedProperties["boardercolor"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
	}

	customElements.define("com-novo-coloredbox-b", ColoredBox);
})();
