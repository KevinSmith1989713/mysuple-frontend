import React from 'react';
import './Loading.scss';
import ReactLoading from 'react-loading';
import Media from 'react-media';
import { connect } from 'react-redux';

const Loading = ({ isLoading }) => {
	return (
		<div
			className="Loading"
			style={{ display: isLoading ? 'inherit' : 'none' }}
		>
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						<ReactLoading type="bars" color="white" height={50} width={50} />
					) : (
						<ReactLoading type="bars" color="white" height={85} width={85} />
					)
				}
			</Media>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.layout.isLoading,
	};
};

export default connect(mapStateToProps)(Loading);
