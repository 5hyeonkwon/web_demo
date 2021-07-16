import React, { Component } from "react";
import reactDom from "react-dom";
import Slide from "react-reveal";
import Rector from './Rector.js';
import Rector2 from './Rector2.js';
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/result/"
axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

class Resume2 extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();

    this.img_videoRef = React.createRef();
    this.img_canvasRef = React.createRef();
    this.img_imageRef = React.createRef();

    this.state = {
      get_video: '',
      videoAttribute: [],
      isLoading : false,
      isGetImage : false,
      isGetVideo : false,
      selected: false,
      ended : false,
      selectedFiles : [],
      x: -1,
      y: -1,
      w: -1,
      h: -1,
      resultURL : '',

      img_get_video: '',
      img_videoAttribute: [],
      img_isLoading : false,
      img_isGetImage : false,
      img_isGetVideo : false,
      img_selected: false,
      img_ended : false,
      img_selectedFiles : [],
      img_x: -1,
      img_y: -1,
      img_w: -1,
      img_h: -1,
      img_resultURL : '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  
  onSelected = (rect) => {
    if (this.state.ended == false){
	  this.setState({
		selected: true,
    ...rect,
    ended : true
	  })
  }
	};
  img_onSelected = (rect2) => {
    if (this.state.img_ended == false){
	  this.setState({
    img_selected: true,
    ...rect2,
    img_ended : true
	  })
  }
	};
  
  getSelectionStr() {
	  if (this.state.selected) {
		const state = this.state
		return `x: ${state.x}, y: ${state.y}, w: ${state.w}, h: ${state.h}`
	  }
	  return null;
	}
  img_getSelectionStr() {
	  if (this.state.img_selected) {
		const state = this.state
		return `x: ${state.img_x}, y: ${state.img_y}, w: ${state.img_w}, h: ${state.img_h}`
	  }
	  return null;
	}


  chosenVideo(e) {
    e.preventDefault();
    /*this.setState({
        file_state: e.target.files[0]
    });*/
    var file = e.target.files[0];
    var file_state = e.target;
    var reader = new FileReader();
    reader.onloadend = () => {
        this.setState({
            get_video: reader.result,
            videoAttribute: file_state,
            isLoading : true,
            selectedFiles : file
        });

    };
    reader.readAsDataURL(file);
}
img_chosenVideo(e) {
  e.preventDefault();
  /*this.setState({
      file_state: e.target.files[0]
  });*/
  var file = e.target.files[0];
  var file_state = e.target;
  var reader = new FileReader();
  reader.onloadend = () => {
      this.setState({
        img_get_video: reader.result,
        img_videoAttribute: file_state,
        img_isLoading : true,
        img_selectedFiles : file
      });

  };
  reader.readAsDataURL(file);
}

onClickHandler(){
  const url = ''
  const formData = new FormData();
  formData.append("video", this.state.selectedFiles);
  formData.append("videoname", this.state.selectedFiles.name);
  formData.append("enctyp", "multipart/form-data");
  formData.append("x", this.state.x);
  formData.append("y", this.state.y);
  formData.append("w", this.state.w);
  formData.append("h", this.state.h);
  formData.append("image", this.state.img_selectedFiles);
  formData.append("imagename", this.state.img_selectedFiles.name);
  formData.append("img_x", this.state.img_x);
  formData.append("img_y", this.state.img_y);
  formData.append("img_w", this.state.img_w);
  formData.append("img_h", this.state.img_h);
  formData.append("resume", "resume2");

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  for (let key of formData.keys()){
    console.log(key);
  }
  for (let value of formData.values()){
    console.log(value);
  }
  return axios.post(url, formData, config)
};

handleFormSubmit(e){
  e.preventDefault();
  this.onClickHandler().then(response=>{
    this.setState({
      resultURL : response.data.video_path,
      isGetVideo : true})
    }).catch(err=>{
      console.log("리턴안됐습니다.");;
  })
}

handleClick(e){
  e.preventDefault();
  if (this.state.isLoading) {
  var context = this.canvasRef.current.getContext('2d');
  this.canvasRef.current.width = 512
  this.canvasRef.current.height = 512
  context.drawImage(this.videoRef.current,0,0,512, 512);
  var dataUrl = this.canvasRef.current.toDataURL();

  this.imageRef.current.src = dataUrl;
  this.imageRef.current.alt = "aa";
  this.setState({isGetImage : true});
  this.setState({ended : false});
}
}
img_handleClick(e){
  e.preventDefault();
  if (this.state.img_isLoading) {
  var context = this.img_canvasRef.current.getContext('2d');
  this.img_canvasRef.current.width = 512
  this.img_canvasRef.current.height = 512
  console.log(this.img_videoRef.current);
  context.drawImage(this.img_videoRef.current,0,0,512,512);
  var dataUrl = this.img_canvasRef.current.toDataURL();

  this.img_imageRef.current.src = dataUrl;
  this.img_imageRef.current.alt = "aa";
  this.setState({img_isGetImage : true});
  this.setState({img_ended : false});
}
}

  render() {
    if (!this.props.data) return null;
    var isVideoPreview = '';
    var img_isVideoPreview = '';
    if(this.state.get_video !== '') {
      isVideoPreview = (
        <div className="hiddenhidden">
          <video
            type="video/swf" 
            preload = 'metadata'
            src={this.state.get_video}
            className="VideoClass"
            id = 'videoId'
            ref = {this.videoRef}
            controls
            crossOrigin  = "anonymous"
          > 
          </video>
          <div id = 'total_canvas'>
          <div id = "canvas_child1">
            {this.state.isGetImage?
            (<Rector  onSelected={this.onSelected.bind(this)} />): 
            null}
            <canvas  id = "canvas2" ref={this.canvasRef} hidden={false}>
            </canvas>
          </div>
        </div>
      </div>
      );
    }
    if(this.state.img_get_video !== '') {
      img_isVideoPreview = (
        <div className="hiddenhidden">
        <img
          preload = 'metadata'
          src={this.state.img_get_video}
          className="ImageClass"
          id = 'imageId'
          ref = {this.img_videoRef}
          crossOrigin  = "anonymous"
        > 
        </img>
        <div id = 'total_canvas'>
        <div id = "canvas_child2">
          {this.state.img_isGetImage?
          (<Rector2 img_onSelected={this.img_onSelected.bind(this)} />): 
          null}
          <canvas  id = "canvas4" ref={this.img_canvasRef} hidden={false}>
          </canvas>
        </div>
        </div>
        </div>
      );
    }

    return (
      <section id="resume2">
        <Slide left duration={1300}>
          <div className="row education">
          <div className="three columns header-col">
              <h1>
                <span>Add Animation</span>
              </h1>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">
                  <div key="video_input" className = "sub_columns">

                    <div className = "buttons" style={{height:"80px"}}>
                        <label className="input-file-button1">
                          <input 
                            id="input-file" 
                            type="file" 
                            accept="video/*" 
                            onChange={this.chosenVideo.bind(this)}
                            style={{display:"none"}} 
                          /> 
                          Upload Video
                        </label>
                        <label className="input-file-button2">
                          <button className="getCapture" onClick={this.handleClick.bind(this)}>Draw Bbox </button>
                        </label>                    
                      </div>


                    <div className = 'demo_video'>
                      {isVideoPreview}
                      <img  id = 'capture_id' ref={this.imageRef}  hidden ={true}></img> 
                    </div>
                    <h1><span>{this.getSelectionStr()}</span></h1><br/>
                  </div>


                  <div key="image_input" className = "sub_columns">
                    <div className = "buttons" style={{height:"80px"}}>
                      <label className="input-file-button1">
                        <input 
                          id="input-file" 
                          type="file" 
                          accept="image/*" 
                          onChange={this.img_chosenVideo.bind(this)}
                          style={{display:"none"}} 
                        /> 
                        Upload Image
                      </label>
                      <label className="input-file-button2">
                        <button className = "getCapture" onClick={this.img_handleClick.bind(this)}>Draw Bbox</button>
                      </label>
                    </div>

                    <div className = 'demo_image'>
                      {img_isVideoPreview}
                      <img  id = 'capture_id2' ref={this.img_imageRef}  hidden ={true}></img>
               
                    </div>
                    <h1><span>{this.img_getSelectionStr()}</span></h1><br/>
                    
                  </div>


                  <div>
                    <form method = "POST" onSubmit={this.handleFormSubmit} encType = "multipart/form-data">
                        <button name = "videofile" className = "post" onClick={this.onClickHandler}><span>Run</span> </button>
                    </form>
                  </div>
                </div>
             </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Result</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div key="video_result">
                {this.state.isGetVideo?
                  (<video controls>
                    <source src = {`http://127.0.0.1:8000/media/rst/${this.state.selectedFiles.name}`}></source>
                  </video>)
                  : null}
              
              </div>

            </div>
          </div>
        </Slide>

      </section>
    );
  }
}

export default Resume2;
