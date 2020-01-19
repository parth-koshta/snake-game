import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Head extends Component {
  render() {
    const x = this.props.position[0];
    const y = this.props.position[1];
    return (
      <View
        style={{
          width: this.props.size,
          height: this.props.size,
          left: x * this.props.size,
          top: y * this.props.size,
          backgroundColor: "#888",
          position: "absolute"
        }}
      />
    );
  }
}
