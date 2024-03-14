import React from 'react';

export default function PortfolioLink(props){
  return(
    <a className="portfolio-link" href={props.link} target='_blank' rel='noreferrer'>
      <p className='portfolio-link__text'>{props.text}</p>
      <div className='portfolio-link__arrow'>↗</div>
    </a>
  ) 
}
