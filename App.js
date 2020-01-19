import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SizeMetrics} from './src/Constants';
import {GameEngine} from 'react-native-game-engine';
import { Head, GameLoop } from './src/Components';

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

          entities = {{
            head: { position: [0,  0], xspeed:1, yspeed:0, nextMove: 1, updateFrequency: 1, size: SizeMetrics.CELL_SIZE, renderer: <Head />}
          }}

          systems = {[GameLoop]} 
        />
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
});

export default App;
