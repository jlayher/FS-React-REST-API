import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    data: []
  }

  // componentDidMount() {
  //   fetch('http://localhost:5000/api/courses')
  //   .then(res => res.json())
  //   .then((resData) => {
  //     this.setState({
  //       data: resData
  //     });
  //   })
  //   .catch(console.log)
  // }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then((resData) => {
        this.setState({
          data: resData.data
        });
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        {this.state.data.map(course => 
          <div>
            <ul>
              <li>{course.id}</li>
              <li>{course.title}</li>
              <li>{course.description}</li>
              <li>{course.userId}</li>
            </ul>
            
          </div>
        )}
      </div>
    );
  }
}

export default App;