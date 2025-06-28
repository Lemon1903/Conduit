import React from "react";
import { useSearchParams } from "react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const articlesCount = 110;
const articlesPerPage = 10;
const maxPaginationLimit = 6;
const minPaginationLimit = 3;
const maxPagination = Math.ceil(articlesCount / articlesPerPage);
const minPaginationNumber = Math.min(maxPagination, minPaginationLimit);

function Home() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");

  if (isNaN(page) || page > maxPagination) {
    return (
      <div className="container">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="page container">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="/profile/eric-simons">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="/article/how-to-build-webapps-that-scale" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">realworld</li>
                  <li className="tag-default tag-pill tag-outline">implementations</li>
                </ul>
              </a>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="/profile/albert-pai">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="/profile/albert-pai" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="/article/the-song-you" className="preview-link">
                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">realworld</li>
                  <li className="tag-default tag-pill tag-outline">implementations</li>
                </ul>
              </a>
            </div>
            {articlesCount > 10 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
                  </PaginationItem>
                  {/* pagination numbers (e.g. 1 2 3 4 5 6 ... 10 11 12) if e.g. current page = 4 */}
                  {Array.from(
                    {
                      length:
                        page > maxPaginationLimit
                          ? minPaginationLimit
                          : Math.min(
                              maxPagination - minPaginationLimit,
                              Math.max(page + 1, minPaginationLimit),
                            ),
                    },
                    (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink isActive={page === index + 1} href={`?page=${index + 1}`}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  {((page + 1 < maxPagination - minPaginationLimit &&
                    maxPagination - minPaginationLimit > minPaginationLimit) ||
                    page > maxPaginationLimit) && (
                    <PaginationItem>
                      <PaginationEllipsis
                        href={`?page=${Math.min(page + (page > maxPaginationLimit ? -2 : 2), maxPagination)}`}
                      />
                    </PaginationItem>
                  )}
                  {/* pagination numbers (e.g. 1 2 3 ... 6 7 8 ... 10 11 12 ) if e.g. current page = 7 */}
                  {page > maxPaginationLimit && (
                    <React.Fragment>
                      {Array.from(
                        { length: Math.min(maxPagination - page - 1, minPaginationLimit) },
                        (_, index) => (
                          <PaginationItem key={page + index - 1}>
                            <PaginationLink
                              isActive={page === page + index - 1}
                              href={`?page=${page + index - 1}`}
                            >
                              {page + index - 1}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}
                      {/* hidden (1 2 3 ... 8 9 10 11 12 13) if e.g current page = 9 */}
                      {page + 1 < maxPagination - minPaginationLimit && (
                        <PaginationItem>
                          <PaginationEllipsis href={`?page=${page + 2}`} />
                        </PaginationItem>
                      )}
                    </React.Fragment>
                  )}
                  {/* last pagination numbers (e.g. 1 2 3 ... 8 9 10) */}
                  {Array.from({ length: minPaginationNumber }, (_, index) => {
                    const number = Math.max(maxPagination - minPaginationLimit, 0) + index + 1;

                    return (
                      <PaginationItem key={number}>
                        <PaginationLink isActive={page === number} href={`?page=${number}`}>
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext href={`?page=${Math.min(page + 1, maxPagination)}`} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
