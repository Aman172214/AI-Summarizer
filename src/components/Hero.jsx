import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="app_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open('https://github.com/Aman172214/AI-Summarizer')}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize articles with
        <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Sumz, an open-source article summarizer that
        tranforms lengthy articles into clear and concise summary
      </h2>
    </header>
  );
};

export default Hero;
