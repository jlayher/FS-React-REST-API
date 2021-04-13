import React, {Component} from 'react';

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    fetch('localhost:5000/api/courses')
    .then(res => res.json())
    .then(res => console.log(res))
    .then((resData) => {
      this.setState({
        data: resData
      });
      console.log(data);
    })
    .catch(console.log)
  }
  render(){
    return (
      <div>
        <span>{data}</span>
      </div>
    );
  }
}

export default App;
