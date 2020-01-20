//https://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader

(function(){
	'use strict';

	const $fileUploadInput = $('#file-upload');
	
	function bindUiEvents() {
		$fileUploadInput.change( function() {
			renderLinks(this.files[0]);
		});
	}

	function renderLinks(file) {
		const reader = new FileReader(),
			$linksContainer = $('.links-container');

		reader.onload = function(event) {
			const text = event.target.result,
				pattern = /<a(?!r)([\s\S]*?)<\/a>/g, /* without negative lookahead (?!r) the pattern would also match <article> 
														without ? in [\s\S]*? the regex would be greedy */
				links = text.match(pattern);

			$linksContainer.empty();

			links.forEach(link => {
				$linksContainer.append(
					`<li class='link-item'>${link}</li>`
				)
			});
		}

		reader.readAsText(file);
		$fileUploadInput.val('');

	}

	bindUiEvents();
})();