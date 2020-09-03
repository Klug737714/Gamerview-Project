import React, { Component } from "react";
import PageHeader from "./common/pageHeader";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader
          title="About The Gamer View"
          description="The who, the what, and the why"
        />
        <h2>Who Are You?</h2>
        <p>Good question! We are gamers who want to make a forum for gamers</p>
        <h2>What is this website?</h2>
        <p>
          it's a forum for gamers, where they can spout off whatever they want
          to say about video games and people will actually listen
        </p>
        <h2>Why did you make this website?</h2>
        <p>
          because I like gaming and I wanted a place like facebook but for video
          games (also I made it for experience making websites)
        </p>
      </div>
    );
  }
}

export default About;
