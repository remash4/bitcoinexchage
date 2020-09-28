import React from 'react'
import { Chart } from 'react-charts'


class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      name: null,
      description: null
    };
  }

  // load data from blockchain API
  componentDidMount() {
    fetch("https://api.blockchain.info/charts/market-price?timespan=1year&sampled=true&metadata=false&cors=true&format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: [{label: result.description, data: result.values.map((key,i)=> ({x: i, y:key.y}))}],
            name: result.name,
            description: result.description
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

formatDate = (timestamp) => {
  var d = new Date(timestamp * 1000);
  var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  
}

 

  render() {
    const { error, isLoaded, data, name, description } = this.state;
    const axes = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ];
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={{"float": "left"}} > 
        <h2>{name}</h2>
        <div
      style={{
        width: '1000px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    <h3>{description}</h3>
    </div>
    </div>
      );
    }
  }
}

export default Market;