import React from "react";

class App extends Component {
    state = {
      height: 38,
    }
  
    animate = () => {
      this.setState((state) => ({ height: state.height === 233 ? 38 : 233 }));
    }
  
    render() {
      return (
        <div className="App">
          <div style={styles.button} onClick={this.animate}>Animate</div>
          <Motion
            style={{ height: spring(this.state.height) }}
          >
            {
              ({ height }) =>
              <div style={Object.assign({}, styles.menu, { height } )}>
                <p style={styles.selection}>Selection 1</p>
                <p style={styles.selection}>Selection 2</p>
                <p style={styles.selection}>Selection 3</p>
                <p style={styles.selection}>Selection 4</p>
                <p style={styles.selection}>Selection 5</p>
                <p style={styles.selection}>Selection 6</p>
              </div>
            }
          </Motion>
        </div>
      );
    }
  }
  
