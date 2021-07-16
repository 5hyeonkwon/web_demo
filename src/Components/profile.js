import React from "react";
import PropTypes from "prop-types";
//import "./profile.css"

const Profile = ({id,poster,name, mail, tmp}) => {
    return (
      <div className="profile">
      <div className="profile_data" id = {id}>
        <div className="profile_image">
        <img className="image" src = {"images/portfolio/" + poster} alt ={name}></img>
        </div>
        <p className="profile_name">
          {name}
        </p>
        <p className="profile_mail">
          " {mail} "
        </p>
        <p className="profile_mail">
          {tmp}
        </p>

      </div>
    </div>
    )
  };

  Profile.prototypes = {
    id : PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    mail : PropTypes.string.isRequired
  }
  export default Profile;