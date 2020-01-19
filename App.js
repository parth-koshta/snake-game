import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {SizeMetrics} from './src/Constants';
import {GameEngine} from 'react-native-game-engine';
import {Head, GameLoop} from './src/Components';

class App extends Component {
  constructor() {
    super();
    this.boardSize = SizeMetrics.GRID_SIZE * SizeMetrics.CELL_SIZE;
    this.engine = null;
  }

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
              position: [0, 0],
              xspeed: 1,
              yspeed: 0,
              nextMove: 1,
              updateFrequency: 1,
              size: SizeMetrics.CELL_SIZE,
              renderer: <Head />,
            },
          }}
          systems={[GameLoop]}
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
            <TouchableOpacity>
              <View style={styles.triangle} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <View style={[styles.triangle, styles.left]} />
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={[styles.triangle, styles.right]} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <View style={[styles.triangle, styles.down]} />
            </TouchableOpacity>
          </View>
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
    borderBottomColor: 'red',
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
