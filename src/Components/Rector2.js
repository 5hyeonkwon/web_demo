import React from 'react';
class Rector2 extends React.Component {
	static defaultProps = {
	  width: 512,
	  height: 512,
	  strokeStyle: '#F00',
	  lineWidth: 1,
	  onSelected: () => {},
	  img_onSelected: () => {},
	  getContext: () => {}
	};
	  
	canvas = null;
	ctx = null;
	isDirty = false;
	isDrag = false;
	startX = -1;
	startY = -1;
	curX = -1;
	curY = -1;
  
	constructor(props) {
	  super(props);
	}
	
	componentDidMount(props) {
	  this.ctx = this.canvas.getContext('2d')
	  this.ctx.globalCompositeOperation="destination-over";
	  this.ctx.strokeStyle = this.props.strokeStyle
	  this.ctx.lineWidth = this.props.lineWidth
	  this.addMouseEvents()
	}
  
	updateCanvas = () => {
	  if (this.isDrag) {
		requestAnimationFrame(this.updateCanvas)
	  }
	  if (! this.isDirty) {
		return
	  }
	  
	  this.ctx.clearRect(0, 0, this.props.width, this.props.height)
	  if (this.isDrag) {      
		const rect = {
		  img_x: this.startX,
		  img_y: this.startY,
		  img_w: this.curX - this.startX,
		  img_h: this.curY - this.startY,
		}
		this.ctx.strokeRect(rect.img_x, rect.img_y, rect.img_w, rect.img_h)  
	  }  
	  this.isDirty = false
	};
  
	componentWillUnmount() {
	
	  this.removeMouseEvents()
	}
  
	addMouseEvents() {
	  document.addEventListener('mousedown', this.onMouseDown, false);
	  document.addEventListener('mousemove', this.onMouseMove, false);
	  document.addEventListener('mouseup', this.onMouseUp, false);
	
	}
	removeMouseEvents() {
	  document.removeEventListener('mousedown', this.onMouseDown, false);
	  document.removeEventListener('mousemove', this.onMouseMove, false);
	  document.removeEventListener('mouseup', this.onMouseUp, false);
	 
	}

  
	onMouseDown = (e) => {
	  this.isDrag = true
	  this.curX = this.startX = e.offsetX
	  this.curY = this.startY = e.offsetY
	  requestAnimationFrame(this.updateCanvas)
	};
  
	onMouseMove = (e) => {
	  if (! this.isDrag) return
	  this.curX = e.offsetX
	  this.curY = e.offsetY
	  this.isDirty = true
	};
	
	onMouseUp = (e) => {
	  this.isDrag = false
	  this.isDirty = true
	  
	  const rect2 = {
		img_x: Math.min(this.startX, this.curX),
		img_y: Math.min(this.startY, this.curY),
		img_w: Math.abs(e.offsetX - this.startX),
		img_h: Math.abs(e.offsetY - this.startY),
	  }
	  this.props.img_onSelected(rect2)
	};
	
	render() {
	  console.log('render')
	  return <canvas id = "canvas3"  width={this.props.width} height={this.props.height} ref={(c) => {this.canvas=c}}/>
	}
  }

  export default Rector2;