import React from "react";
import { useParams } from "react-router";
import { client } from "../../client";
import './movie.scss';
import youtube from '../../../assets/images/youtube.png';
import disney from '../../../assets/images/disney.png';
import netflix from '../../../assets/images/netflix.png';
import amazon from '../../../assets/images/amazon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMyList } from "../../../components/contexts/MyMoviesContextProvider";
import { deleteBookmarkItem, insertBookmarkItem, isBookmarkItem } from "../../service/Booksmark";
import { faArrowLeft, faBookmark as faBookmarkSolid, faClock as faClockSolid, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons';

interface Movie {
    backdrop_path: string;
    genres: { id: number, name: string }[];
    genre_ids: number[];
    id: number;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
    vote_count: number;
}

interface Cast {
    job: string;
    name: string;
}

interface Rent {
    provider_name: string;
}

export const MoviePage = React.memo(() => {

    const [loading, setLoading] = React.useState(false);
    const [movie, setMovie] = React.useState<Movie>(undefined);
    const [providers, setProviders] = React.useState<Rent[]>([]);
    const [credit, setCredit] = React.useState<{ cast: Cast[], crew: Cast[] }>({ cast: [], crew: [] });
    const [trailer, setTrailer] = React.useState<{ cast: Cast[], crew: Cast[] }>({ cast: [], crew: [] });
    const { id } = useParams<{ id: string }>();

    const { isMovieAlreadySave, removeMovie, insertMovie } = useMyList();

    const [isBookmarked, setIsBookmarked] = React.useState(isBookmarkItem(Number(id)));
    const [isInWatchLaterList, setIsInWatchLaterList] = React.useState(isMovieAlreadySave(Number(id)));

    const fetchMovie = async () => {
        try {
            setLoading(true)
            await client().get(`/movie/${Number(id)}`).then(({ data }) => {
                setMovie(data);
            })
            await client().get(`/movie/${Number(id)}/watch/providers`).then(({ data }) => {
                const rent = data.results.US?.rent ?? [];
                const flatrate = data.results.US?.flatrate ?? [];
                const buy = data.results.US?.bye ?? [];
                setProviders([...rent, ...flatrate, ...buy])
            });
            await client().get(`/movie/${Number(id)}/credits`).then(({ data }) => {
                setCredit(data)
            });
            await client().get(`/movie/${Number(id)}/videos`).then(({ data }) => {
                setTrailer(data.results.find(video => video.type === 'Trailer' && video.site === "YouTube")?.key);
            });
            setLoading(false)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchMovie();
    }, []);

    if (!movie || loading) {
        return <span>Loading...</span>
    }


    const toggleBookmarkItem = () => {
        if (isBookmarked) {
            deleteBookmarkItem(movie.id);
            setIsBookmarked(false);
        } else {
            insertBookmarkItem(movie.id);
            setIsBookmarked(true);
        }
    }

    const toggleWatchLaterListItem = () => {
        if (isInWatchLaterList) {
            removeMovie(movie);
            setIsInWatchLaterList(false);
        } else {
            insertMovie({ ...movie, genre_ids: movie.genres.map(g => g.id) });
            setIsInWatchLaterList(true);
        }
    }

    const handleReturn = () => { 
        history.back();
        console.log(providers);
        
    }

    // const hasOnAmazon = providers.find(provider => ['Amazon Prime Video', 'Amazon Video'].includes(provider.provider_name)) ? true : false;
    // const hasOnNetFlix = providers.find(provider => provider.provider_name === 'Netflix') ? true : false;
    // const hasOnYoutube = providers.find(provider => provider.provider_name === 'YouTube') ? true : false;
    // const hasOnDisney = providers.find(provider => provider.provider_name === 'Disney Plus') ? true : false;

    return (
        <div className="cl-movie">
            <div className="cl-movie__info">
                <img className="cl-movie__image" src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`} alt='movie' />
                <img className="cl-movie__image-mobile" src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`} alt='movie' />
                <div>
                    <div className="cl-movie__header">
                        <div className='cl-movie__title'>
                            {movie.title}
                        </div>
                        <div className='cl-movie__categories'>
                            {movie.genres.map(genre => genre.name).join(' - ')}
                        </div>
                    </div>

                    <div className='cl-movie__verticalHorizontal' />
                    <div className="cl-movie__overview">
                        <b>Overview:</b>
                        <p>{movie.overview || 'There\'s nothing here, yet.'}</p>
                    </div>

                    <div className="cl-movie__cast">
                        <p><b>Directors: </b> {credit.crew.filter(e => e.job === "Director").map(e => e.name).join(', ')}</p>
                        <p><b>Producers: </b> {credit.crew.filter(e => e.job === "Producer").map(e => e.name).join(', ')}</p>
                        <p><b>Cast: </b> {credit.cast.slice(0, 4).map(e => e.name).join(', ')}</p>
                    </div>
                    <div className='cl-movie__verticalHorizontal' />
                    <div className="cl-movie__actions">
                        <span>
                            <FontAwesomeIcon color='#eb7000' icon={faStarHalfAlt} />
                            <span>{movie.vote_average} / 10</span>
                        </span>

                        <span onClick={toggleWatchLaterListItem}>
                            <FontAwesomeIcon
                                color='#eb7000' icon={isInWatchLaterList ? faClockSolid : faClockRegular}
                            />
                            <span>Watch Later</span>
                        </span>

                        <span onClick={toggleBookmarkItem}>
                            <FontAwesomeIcon
                                color='#eb7000'
                                icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                            />
                            <span>Booksmark</span>
                        </span>
                    </div>

                    <div className="cl-movie__watch">
                        <div className="cl-movieCard__backButton" onClick={handleReturn}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span>Return</span>
                        </div>
                        {true && <img src={amazon} alt='amazon' width={100} />}
                        {true && <img src={disney} alt='disney' width={100} />}
                        {true && <img src={netflix} alt='netflix' width={100} />}
                        {true && <img src={youtube} alt='youtube' width={100} />}
                    </div>
                </div>
            </div>
            {trailer ?
                <iframe src={`https://www.youtube.com/embed/${trailer}`}
                    title="YouTube video player" frameBorder="0"
                    height="50vw" width="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe> : <h2>Trailer not available... :(</h2>
            }
        </div>
    );
});