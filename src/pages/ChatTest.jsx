import React from 'react';

const ChatTest = () => {
	React.useEffect(() => {
		localStorage.setItem('iframe', 'test');

		window.addEventListener('message', function (e) {
			// console.log(e); // { hello: 'parent' }
			var item = localStorage.getItem('iframe');

			this.document
				.getElementById('iframe')
				.contentWindow.postMessage(item, '*');
			// document.getElementById('iframe').contentWindow.postMessage(item, '*');
		});
		// document.getElementById('iframe').contentWindow.postMessage(item, '*');
	}, []);

	return (
		<div>
			<iframe
				className="simulator"
				src={'http://localhost:3001/_f/FNX2jI6KAF3y2LZsUtOw?_s=l'}
				width="720"
				height="550"
				frameborder="0"
				scrolling="no"
				id="iframe"
			></iframe>
		</div>
	);
};

export default ChatTest;
