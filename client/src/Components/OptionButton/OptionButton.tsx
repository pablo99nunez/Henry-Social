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
  
  const styles = {
    menu: {
      marginTop: 20,
      width: 300,
      border: '2px solid #ddd',
      overflow: 'hidden',
    },
    button: {
      display: 'flex',
      width: 200,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      borderRadius: 4,
      backgroundColor: '#ffc107',
      cursor: 'pointer',
    },
    selection: {
      margin: 0,
      padding: 10,
      borderBottom: '1px solid #ededed',
    },
  }