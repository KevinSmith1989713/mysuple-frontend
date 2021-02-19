import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { reqEditorPick } from '../store/EditorPick/EditorPick.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import EditorPickContainer from '../container/EditorPickContainer/EditorPickContainer';
import Loading from '../components/Loading/Loading';

class EditorPick extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		const { match, reqEditorPick } = this.props;
		reqEditorPick(match.params.id);
	}

	componentDidMount() {
		const { match, reqEditorPick } = this.props;
		reqEditorPick(match.params.id);
	}

	render() {
		const { isLoading, editorPick } = this.props;

		return (
			<div className="EditorPick">
				<Helmet>
					<title>슈퍼플레이어 | Editor's pick</title>
				</Helmet>
				<ContentBoard>
					{Object.keys(editorPick).length > 0 && (
						<EditorPickContainer editorInfo={editorPick} />
					)}
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.layout.isLoading,
		editorPick: state.editorPick.editorPick,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqEditorPick: id => dispatch(reqEditorPick(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPick);
