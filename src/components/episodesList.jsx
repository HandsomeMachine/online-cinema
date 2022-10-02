import React, { useState, useEffect } from "react";
import { fetchYears, fetchAll } from "../fakeApi/episodesApi";
import Episode from "./episode";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const EpisodesList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [years, setYears] = useState([]);
  const [filter, setFilter] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const count = episodes.length; // количество записей
  const pageSize = 6; // количество записей на странице, которое хотим выводить

  // Функция для получения эпизодов
  const getEpisodes = (year) => {
    fetchAll(year).then((response) => setEpisodes(response));
    setCurrentPage(1);
  };

  // Запрашиваем список эпизодов когда меняется фильтр
  useEffect(() => {
    getEpisodes(filter);
  }, [filter]);

  useEffect(() => {
    fetchYears().then((response) => setYears(response));
  }, []);

  // Функция для установки номера страницы
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Функция для установки фильтра
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleReset = () => {
    setFilter(); // Ничего не устанавливаем (undefined)
  };

  const pageEpisodes = paginate(episodes, currentPage, pageSize);

  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-4">
          {!!years.length && (
            <>
              <GroupList
                items={years}
                filter={filter}
                onChangeFilter={handleFilterChange}
              />
              <hr />
              <div className="d-grid">
                <button onClick={handleReset} className="btn btn-m btn-primary">
                  Очистить
                </button>
              </div>
            </>
          )}
        </div>
        <div className="col-8">
          <div className="row">
            {pageEpisodes.map((episode) => (
              <Episode key={episode.id} {...episode} />
            ))}
          </div>
          <div className="row">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesList;
