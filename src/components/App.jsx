import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StaticContainer from 'react-static-container'
import styles from '../scss/AppTransitions';

class RouteCSSTransitionGroup extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      previousPathname: null
    }
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ previousPathname: this.context.location.pathname })
    }
  }
  
  render() {
    const children = this.props.children;
    const { previousPathname } = this.state

    return (
      <ReactCSSTransitionGroup {...this.props}>
        <StaticContainer
          key={previousPathname || this.context.location.pathname}
          shouldUpdate={!previousPathname}
        >
          {children}
        </StaticContainer>
      </ReactCSSTransitionGroup>
    )
  }
  
  componentDidUpdate() {
    if (this.state.previousPathname) {
      this.setState({ previousPathname: null })
    }
  }
}

RouteCSSTransitionGroup.contextTypes = {
  location: React.PropTypes.object
}

export default class App extends Component {
  render() {
    return (
      <RouteCSSTransitionGroup
        component="div"
        transitionName={{
          enter: styles.crossfadeEnter,
          enterActive: styles.crossfadeEnterActive,
          leave: styles.crossfadeLeave,
          leaveActive: styles.crossfadeLeaveActive
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {this.props.children}
      </RouteCSSTransitionGroup>
    )
  }
}