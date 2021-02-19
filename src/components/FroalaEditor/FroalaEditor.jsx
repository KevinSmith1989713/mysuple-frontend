import React, { useState, useEffect, useCallback } from 'react';
import { url } from '../../constants/apiUrl.js';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
import FroalaEditor from 'react-froala-wysiwyg';

import './FroalaEditor.scss';

const ReactFroalaEditor = ({ editor, bucket, editorValue }) => {
	const handleModelChange = e => {
		editorValue(e);
	};

	const bucketName = {
		// TODO: 버킷폴더 알려주시면 아이디에 따라 반영
	};

	const PLACEHOLDER = bucket === 'faq' ? 'A. 답변' : '내용을 입력하세요';
	return (
		<div className="FroalaEditor">
			<FroalaEditor
				attribution={false}
				// onModelChange={e => setText(e)}
				onModelChange={e => handleModelChange(e)}
				className="froala"
				model={editor}
				direction="auto"
				config={{
					attribution: false,
					placeholderText: PLACEHOLDER,
					key:
						'YNB3fJ3A6B7D6A5C2A-9UJHAEFZMUJOYGYQEa1c1ZJg1RAeF5C4C3D3E2C2B5D6A3A2==',
					toolbarButtons: {
						moreText: {
							buttons: [
								// 'bold',
								// 'italic',
								// 'underline',
								// 'strikeThrough',
								// 'subscript',
								// 'superscript',
								// 'fontFamily',
								// 'fontSize',
								// 'textColor',
								// 'backgroundColor',
								// 'inlineClass',
								// 'inlineStyle',
								// 'clearFormatting',
							],
						},
						moreParagraph: {
							buttons: [
								// 'alignLeft',
								// 'alignCenter',
								// 'formatOLSimple',
								// 'alignRight',
								// 'alignJustify',
								// 'formatOL',
								// 'formatUL',
								// 'paragraphFormat',
								// 'paragraphStyle',
								// 'lineHeight',
								// 'outdent',
								// 'indent',
								// 'quote',
							],
						},
						moreRich: {
							buttons: [
								// 'insertLink',
								'insertImage',
								'insertVideo',
								// 'insertTable',
								'emoticons',
								// 'fontAwesome',
								// 'specialCharacters',
								// 'embedly',
								// 'insertFile',
								// 'insertHR',
							],
						},
						moreMisc: {
							buttons: [
								'undo',
								'redo',
								// 'fullscreen',
								// 'print',
								// 'getPDF',
								// 'spellChecker',
								// 'selectAll',
								// 'html',
								// 'help',

								'insertLink',
								'insertTable',
								'fontAwesome',
								'specialCharacters',
								'embedly',
								'insertFile',
								'insertHR',
								'bold',
								'italic',
								'underline',
								// 'strikeThrough',
								// 'subscript',
								// 'superscript',
								'fontFamily',
								'fontSize',
								'textColor',
								'backgroundColor',
								// 'inlineClass',
								// 'inlineStyle',
								// 'clearFormatting',
								'alignLeft',
								'alignCenter',
								'formatOLSimple',
								'alignRight',
								'alignJustify',
							],
							align: 'right',
							buttonsVisible: 2,
						},
					},
					pluginsEnabled: [
						'table',
						'spell',
						'quote',
						'save',
						'quickInsert',
						'paragraphFormat',
						'paragraphStyle',
						'help',
						'draggable',
						'align',
						'link',
						'lists',
						'file',
						'image',
						'emoticons',
						'url',
						'video',
						'embedly',
						'colors',
						'entities',
						'inlineClass',
						'inlineStyle',
						'imageTUI',
					],
					imageUploadURL: `${url.file}/ImageOnEditor`,
					imageMaxSize: 10 * 3000 * 3000,
					// imageUploadMethod: 'GET',
					imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
					requestHeaders: {
						bucket_name: 'editor_pick',
					},
					// autofocus: true,
					direction: 'auto',
				}}
			/>
		</div>
	);
};

export default ReactFroalaEditor;
