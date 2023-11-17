import React, { useEffect, useState } from "react";
import { copy, linkIcon, tick, submitIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Content = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { isLoading, error }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles"));

    if (storedArticles) {
      setAllArticles(storedArticles);
    }
  }, []);

  const inputChangeHandler = (event) => {
    setArticle({ ...article, url: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const newAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(newAllArticles);

      localStorage.setItem("articles", JSON.stringify(newAllArticles));
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="w-full flex flex-col gap-2">
        <form
          onSubmit={submitHandler}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            className="url_input peer"
            type="url"
            placeholder="Enter a URL"
            required
            onChange={inputChangeHandler}
          />
          <button
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            type="submit"
          >
            <img src={submitIcon} alt="submit_icon" />
          </button>
        </form>
        
      </div>
    </section>
  );
};

export default Content;
