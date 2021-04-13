import React, {Component} from 'react';

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then((resData) => {
      this.setState({
        data: resData
      });
    })
    .catch(console.log)
  }
  render(){
    return (
      <div>
        {this.state.data.map(course => 
          <div>
            {course.description}
          </div>
        )}
      </div>
    );
  }
}

export default App;