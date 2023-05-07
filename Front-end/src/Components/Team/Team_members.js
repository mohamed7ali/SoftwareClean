import React from "react";

import TeamCard from "./Team_Card";
import { Data } from "./TeamData";
const TeamMembers = () => {
  const display_Team_Cards = () => {
    return Data.map((item) => {
      return <TeamCard name={item.name} img={item.img} team={item.team} />;
    });
  };

  return (
    <div className="team text-center pb-5 pt-5">
      <div className="container pb-5 pt-5">
        <h1 style={{ color: "white" }}>TEAM MEMBERS</h1>
        <p style={{ color: "yellow" }} className="fs-10 mb-50  fw-bold">
          Introduced to you by:
        </p>

        <div className="row justify-content-center">{display_Team_Cards()}</div>
      </div>
    </div>
  );
};

export default TeamMembers;
