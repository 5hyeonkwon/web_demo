import React, { Component } from "react";
import { Fade} from "react-reveal";
import Profile from "./profile";

class Member extends Component {
  render() {
    if (!this.props.data) return null; 
    const members = this.props.data.members;
    const message = this.props.data.Message ;
  
    return (
      <section id="member">
        <Fade bottom duration={2000}>
          <div className="row section-head">
              <p className="lead">{message}</p>
          </div>
        </Fade>
        <div className="row">
          <Fade left duration={2000}>
            <div className="nine-columns">
              <form action="" method="post" id="memberForm" name="memberForm">
                <fieldset className = 'profileField'>

                  <div className = 'profileList'>
                      {members && members.slice(0,3).map((member,index) => {
                        console.log(member)
                      
                        var a = <Profile id = {member.id}
                                         poster = {member.poster}
                                         name = {member.name}
                                         mail = {member.mail}
                                         tmp = {member.tmp}
                                         key = {index}/>
                        return a;
                      })}                   
                  </div>
                  <div className = 'profileList'>
                      {members && members.slice(3,6).map((member,index) => {
                        console.log(member)
                      
                        var a = <Profile id = {member.id}
                                         poster = {member.poster}
                                         name = {member.name}
                                         mail = {member.mail}
                                         tmp = {member.tmp}
                                         key = {index}/>
                        return a;
                      })}                   
                  </div>
                  <div className = 'profileList'>
                      {members && members.slice(6,9).map((member,index) => {
                        console.log(member)
                      
                        var a = <Profile id = {member.id}
                                         poster = {member.poster}
                                         name = {member.name}
                                         mail = {member.mail}
                                         tmp = {member.tmp}
                                         key = {index}/>
                        return a;
                      })}                   
                  </div>
                  
                </fieldset>
              </form>

              <div id="message-warning"> Error boy</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            </div>
          </Fade>
        </div>
      </section>
    );
  }
}

export default Member;
