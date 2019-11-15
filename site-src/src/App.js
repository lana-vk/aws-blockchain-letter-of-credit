import React, {Component} from 'react';
import TabBar from './TabBar';
import Websocket from 'react-websocket';

import axios from 'axios';
import util from 'util';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:"Blockchain Dashboard",
      isLoading: false, items: [], error: null 
    };
    this.props=props;
  }
  
  updateHooks= []

  addUpdateHook = (itemId, updateFunc) => { 
    this.updateHooks = this.updateHooks.filter(x => x.itemId !== itemId)
    this.updateHooks.push({itemId: itemId, updateFunc: updateFunc});
  }


  config = {apiUrl:(process.env.REACT_APP_API_URL)?process.env.REACT_APP_API_URL:window.location.origin,
            wsUrl :(process.env.REACT_APP_WS_URL)?process.env.REACT_APP_WS_URL:
                    'ws://'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')+'/ws',
            addUpdateHook: this.addUpdateHook
          };

  wsEvent = (event) => {
    var jEvent=JSON.parse(event);
    console.log("Websocket event: " + util.inspect(jEvent));
    if (jEvent["ccEvent"]) {
      switch (jEvent["ccEvent"]["action"]) {
        case "CREATE":
          if (!this.state.isLoading) {
            this.updateItems();
          }
          break;
        case "DELETE":
            this.updateItems();
            break;
        case "CONFIRM":
            this.updateHooks.find(x => x.itemId===jEvent["ccEvent"]["itemId"]).updateFunc();
            break;
        case "APPROVE":
            this.updateHooks.find(x => x.itemId===jEvent["ccEvent"]["itemId"]).updateFunc();
            break;
        default:
          console.log("Got some other event");
      }
    }
  }

  updateItems = () => {
    this.setState({ isLoading: true, items: [], error: null });
    axios.get(this.config.apiUrl + '/order/list')
      .then(result => 
        this.setState({
          items: result.data,
          isLoading: false })
        ) 
      .catch(error => this.setState({ error: error, isLoading: false })); 
  }

  componentDidMount = () => {
    this.updateItems();
  }

  render() {
    if (this.state.isLoading) return (<div>LOADING</div>);
    if (this.state.error) return (<div>{util.inspect(this.state.error)}</div>);
    return (
      <React.Fragment>      
        <Websocket url={this.config.wsUrl} onMessage={(event) => this.wsEvent(event)} />
        <TabBar items={this.state.items} config={this.config} />
      </React.Fragment>
    );
  }
}