import React from "react";

const TeamCard = (props) => {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="box bg-white">
        <img className="img-fluid" src={props.img} alt="" />
        <h4 style={{ color: "black" }} className="p-3 ">
          {props.name}
        </h4>
        <blockquote className="text-black-50 p-3 ">{props.team}</blockquote>
      </div>
    </div>
  );
};

export default TeamCard;
