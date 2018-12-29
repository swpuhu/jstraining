import React from 'react';

class PolygonGraph extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    let offset = 20;
    let width = this.props.width;
    let height = this.props.height;
    let xMax = this.props.data[0].x;
    let xMin = this.props.data[0].x;
    this.props.data.forEach(item => {
      if (item.x > xMax) {
        xMax = item.x
      }
      if (item.x < xMin) {
        xMin = item.x;
      }
    });
    let xScale = (this.props.width - 3 * offset) / (xMax - xMin);
    let obj = this.props.data.map((item, index, self) => {
      let o = {};
      o.circle = <circle cx={(item.x * xScale + offset)} cy={height - item.y - offset} r="3" key={index}></circle>
      if (index !== self.length - 1) {
        o.line = 
        <line 
        x1={(item.x * xScale + offset)} 
        y1={height - item.y - offset} 
        x2={self[index + 1].x * xScale + offset} 
        y2={height - self[index + 1].y - offset} 
        key={index}
        style={{
          stroke: this.props.stroke,
          strokeWidth: this.props.strokeWidth
        }}></line>
      }
      return o;
    });
    return (
      <div style={{position: "relative", width: this.props.width, height: this.props.height}}>
        <svg style={{position: "absolute", zIndex: 0}} width={this.props.width} height={this.props.height}>
          <g style={{stroke: this.props.stroke}} strokeWidth={this.props.strokeWidth}>
            <line x1={offset} y1={this.props.height - offset} x2={offset} y2={offset}></line>
            <line x1={offset} y1={this.props.height - offset} x2={this.props.width - offset} y2={this.props.height - offset}></line>
          </g>
        </svg>
        <svg style={{position: "absolute", zIndex: 1}} width={this.props.width} height={this.props.height}>
          <g style={{fill: this.props.fill}}>
            {obj.map(item => item.circle)}
            {obj.map(item => item.line)}
          </g>
        </svg>
      </div>
    )
  }
}

CurveGraph.defaultProps = {
  width: 640,
  height: 360,
  stroke: '#4269c1',
  fill: '#4269cc',
  strokeWidth: 2,
  data: [
    {
      x: 10,
      y: 200
    },
    {
      x: 20,
      y: 300
    },
    {
      x: 50,
      y: 100
    },
    {
      x: 100,
      y: 10
    },
    {
      x: 200,
      y: 280
    },
    {
      x: 300,
      y: 150
    },
    {
      x: 380,
      y: 320
    }
  ]
}

export default PolygonGraph;