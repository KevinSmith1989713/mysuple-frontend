import React from 'react';
import './EditorPickContainer.scss';
import { connect } from 'react-redux';
import { changeMenu } from '../../store/Layout/Layout.store';
import EditorPickHeader from '../../components/EditorPickHeader/EditorPickHeader';
import EditorPickGameSec from '../../components/EditorPickGameSec/EditorPickGameSec';
import Fxjs from '../../Utils/fxjs';
import { logPageView } from '../../Utils/analytics';

let fn = new Fxjs();

class EditorPickContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	render() {
		const { editorInfo } = this.props;
		const editorContent = document.querySelector('.main--content');

		if (!!editorContent) {
			const imgArray = fn.filter(
				a => a.nodeName === 'IMG',
				editorContent.querySelectorAll('*'),
			);

			for (let key of imgArray) {
				key.parentNode.classList.add('image');
			}
		}

		if (!!editorInfo) {
			
			return (
				<div className="EditorPickContainer">
					<div className="EditorPickContainer--Header">
						<EditorPickHeader info={editorInfo} />
					</div>

					<div className="EditorPickContainer--Intro">
						<div className="titles">
							<div className="main-title">{editorInfo.main.editor_title}</div>
							<div className="sub-title">{editorInfo.main.editor_subTitle}</div>
							<div className="underline"></div>
						</div>
						<div
							className="main--content"
							dangerouslySetInnerHTML={{
								__html: editorInfo.main.editor_mainContent,
							}}
						/>
					</div>
					<div className="EditorPickContain--GameSection">
						{editorInfo.sub.map((subElement, index) => {
							return <EditorPickGameSec info={subElement} index={index} />;
						})}
					</div>
				</div>
			);
		} else return <div>로딩</div>;
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditorPickContainer);
