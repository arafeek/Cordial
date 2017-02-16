import React from 'react';

function ConnectToModel(Component, model) {
	let subscription;
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.changeHandler = this.changeHandler.bind(this);
			this.state = {
				[model.model]: model
			};
		}
		changeHandler(state) {
			this.setState({
				[model.model]: state
			});
		}
		componentDidMount() {
			subscription = model.subscribe(this.changeHandler);
			this.setState({[model.model]: model});
		}
		componentWillUnmount() {
			model.unsubscribe(subscription);
		}
		render() {
			return <Component  {...this.props} {...this.state}/>;
		}
	};
}

export default ConnectToModel;
