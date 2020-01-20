import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Text} from 'react-native';
import {SizeMetrics} from './src/Constants';
import {GameEngine} from 'react-native-game-engine';
import {Head, GameLoop, Food, Tail} from './src/Components';

class App extends Component {
  constructor() {
    super();
    this.boardSize = SizeMetrics.GRID_SIZE * SizeMetrics.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
      initialPos: {
        x: 0,
        y: 0,
      },
    };
  }

  onEvent = e => {
    if (e.type === 'game-over') {
      this.setState({
        running: false,
      });
      Alert.alert('Game Over');
    }
  };
  startGame = () => {
    this.setState({
      running: true,
      initialPos: {
        x: 0,
        y: 0,
      },
    });
  };

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={ref => {
            this.engine = ref;
          }}
          style={[
            {
              width: this.boardSize,
              height: this.boardSize,
              backgroundColor: '#ffffff',
              flex: null,
            },
          ]}
          entities={{
            head: {
              position: [this.state.initialPos.x, this.state.initialPos.y],
              xspeed: 1,
              yspeed: 0,
              nextMove: 1,
              updateFrequency: 1,
              size: SizeMetrics.CELL_SIZE,
              renderer: <Head />,
            },
            food: {
              position: [
                this.randomBetween(0, SizeMetrics.GRID_SIZE - 1),
                this.randomBetween(0, SizeMetrics.GRID_SIZE - 1),
              ],
              size: 20,
              renderer: <Food />,
            },
            tail: { size: 20, elements: [], renderer: <Tail /> }
          }}
          systems={[GameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}
        />
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-up'});
              }}>
              <View style={styles.triangle} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-left'});
              }}>
              <View style={[styles.triangle, styles.left]} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-right'});
              }}>
              <View style={[styles.triangle, styles.right]} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({type: 'move-down'});
              }}>
              <View style={[styles.triangle, styles.down]} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!this.state.running && (
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={this.startGame}>
              <Text style={{color: 'red'}}>Start Game</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'green',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  right: {
    transform: [{rotate: '90deg'}],
    marginLeft: 40,
  },
  left: {
    transform: [{rotate: '-90deg'}],
  },
  down: {
    transform: [{rotate: '180deg'}],
  },
});

export default App;
