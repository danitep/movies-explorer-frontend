import React from 'react';
import PortfolioLink from '../PortfolioLink/PortfolioLink';

export default function Portfolio(props){
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <PortfolioLink
        link="https://github.com/danitep/how-to-learn"
        text="Статичный сайт"
      />
      <PortfolioLink
        link="https://github.com/danitep/mesto-react"
        text="Адаптивный сайт"
      />
      <PortfolioLink
        link="https://github.com/danitep/russian-travel"
        text="Одностраничное приложение"
      />
    </section>
  ) 
}
