import { useState, useEffect } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {

    const navigate = useNavigate()
    const {url} = useSelector((state) => state.home)
    const [background, setBackground] = useState('')
    const [query, setQuery] = useState('')
    const {data, loading} = useFetch('/movie/upcoming')
    
    const searchQueryHandler = (e) => {
        if(e.key === 'Enter' && query.length > 0){
            navigate(`/search/${query}`)
        }
    }

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
      }, [data]);

  return (
    <div className='heroBanner'>

        {!loading && <div className='backdrop-img'>
            <Img src={background} />
        </div>}

        <div className='opacity-layer'></div>

        <ContentWrapper>
            <div className='heroBannerContent'>
                <span className='title'>Welcome</span>
                <span className='subTitle'>
                    Millions of movies, TV shows & people to discover.
                    Explore now.
                </span>
                <div className='searchInput'>
                    <input 
                        type='text'
                        placeholder='Search for a Movie or a TV show...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner