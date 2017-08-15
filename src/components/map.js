import React from 'react'
import axios from 'axios';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities:[]
    }

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    let img = e.target;
    let point = { x: e.offsetX, y: e.offsetY };
    const latSize = img.height / 180;
    const lonSize = img.width / 360;
    const r = 1;

    if (!point.x) {
      point = {
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop
      };
    }
    const lat = (point.y = (img.height / 2)) / latSize;
    const lon = (point.x = (img.width / 2)) / lonSize;
    // http://www.geonames.org/export/ws-overview.html
    var ws = `http://api.geonames.org/citiesJSON?formatted=true&north=${lat + r}&south=${lat - r}&east=${lon + r}&west=${lon - r}&lang=de&username=geek`;
    console.log(ws);
    axios.get(ws)
      .then((data) => {
        console.log(data);
        this.setState({cities: data});
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  render() {
    return (
      <img onClick={this.onClick} src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Earthmap1000x500compac.jpg" />
    );
  }
}