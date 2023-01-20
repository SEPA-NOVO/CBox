(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 0px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		canvas {
			display: block;
			position: absolute;
			outline:0;
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
					"assetPath": "",
					"jsPath": "",
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
