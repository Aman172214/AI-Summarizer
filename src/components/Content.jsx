import React, { useEffect, useState } from "react";
import { copy, linkIcon, loader, submitIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Content = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allURLs, setAllURLs] = useState([]);
  const [getSummary, { isLoading, error }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const storedURLs = JSON.parse(localStorage.getItem("articles"));

    if (storedURLs) {
      setAllURLs(storedURLs);
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
      const newAllURLs = [newArticle, ...allURLs];

      setArticle(newArticle);
      setAllURLs(newAllURLs);

      localStorage.setItem("articles", JSON.stringify(newAllURLs));
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="w-full flex flex-col gap-2">
        {/* Search Form */}
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
        {/* Display URLs */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allURLs.map((article, index) => (
            <div
              key={index}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>
        {/* Display Summary */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isLoading ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Sorry, something went wrong!
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
