import React from 'react';
import './Counter.scss';
import { connect } from 'react-redux';
import { increment, decrement } from '../../store/Counter/Counter.store';

function Counter({ increment, decrement, count }) {
	return (
		<div className="counter">
			<h1>Counter</h1>
			<p>{count}</p>
			<div className="button-grp">
				<button onClick={increment}>+</button>
				<button onClick={decrement}>-</button>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		count: state.counter.count,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		increment: () => dispatch(increment()),
		decrement: () => dispatch(decrement()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Counter);
