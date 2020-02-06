import React from 'react';
import axios from 'axios';
import Header from './header';
import Console from './console';
import Alert from './alerts';

class Home extends React.Component {
  state = {
    isErr: false,
    data: [],
  }
  componentDidMount() {
    const isSignedIn = sessionStorage.getItem('token');
    if (!isSignedIn) {
      this.props.history.push('/login');
    }
  }
  async getFizzBuzz() {
    const count = document.querySelector('#count').value;
    this.setState({ isErr: false });
    if (isNaN(count)) {
      this.setState({ isErr: true, msg: 'Not a valid number '});
      return;
    } else if (count < 1 || count > 100) {
      this.setState({ isErr: true, msg: 'Count should be greater than 0 and less 101'});
      return;
    }
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`/api/fizzBuzz/${count}`, config);
    const { data } = res;
    if (data.auth) {
      this.setState({ isErr: false, data: res.data.data });
    } else {
      this.setState({ isErr: true, msg: 'Unexpected API error!'});
    }
  }
  render() {
    const { isErr, msg, data } = this.state;
    return (
      <>
        <Header />
        <div className="flex flex-col px-10">
          <div className="container py-10 max-w-md" >
            <div className="px-4 pb-4">
              <label htmlFor="count" className="text-xl block font-bold pb-2">FizzBuzz Count</label>
              <input type="number" name="count" id="count" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="#" />
              <button onClick={() => this.getFizzBuzz()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Run</button>
            </div>
            {(isErr ? <Alert msg={msg} /> : <div />)}
          </div>
          <Console data={data} />
        </div>
      </>
    );
  }
}
export default Home;
