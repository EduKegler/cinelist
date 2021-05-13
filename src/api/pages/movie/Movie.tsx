import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router";
import { client } from "../../client";
import './movie.scss';

interface Movie {
    backdrop_path: string;
    genres: { id: number, name: string }[];
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

export const MoviePage = React.memo(() => {

    const [loading, setLoading] = React.useState(false);
    const [movie, setMovie] = React.useState<Movie>(undefined);
    const [_, setProviders] = React.useState<[]>([]);
    const [credit, setCredit] = React.useState<{ cast: Cast[], crew: Cast[] }>({ cast: [], crew: [] });
    const [trailer, setTrailer] = React.useState<{ cast: Cast[], crew: Cast[] }>({ cast: [], crew: [] });
    const { id } = useParams<{ id: string }>();

    const fetchMovie = async () => {
        try {
            setLoading(true)
            await client().get(`/movie/${Number(id)}`).then(({ data }) => {
                setMovie(data);
            })
            await client().get(`/movie/${Number(id)}/watch/providers`).then(({ data }) => {
                setProviders(data)
            });
            await client().get(`/movie/${Number(id)}/credits`).then(({ data }) => {
                setCredit(data)
            });
            await client().get(`/movie/${Number(id)}/videos`).then(({ data }) => {
                console.log(data)
                setTrailer(data.results.find(video => video.type === 'Trailer' && video.site === "YouTube").key);
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

    return (
        <div className="cl-movie">
            <div className="cl-movie__info">
                <img className="cl-movie__image" src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`} alt='movie' />
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
                        <p><b>Cast: </b> {credit.cast.splice(0, 4).map(e => e.name).join(', ')}</p>
                    </div>

                    <div className="cl-movie__watch">
                        <div className="cl-movie__watchButton">
                            <FontAwesomeIcon icon={faPlay} size='xs' />Watch
                </div>
                    </div>
                </div>
            </div>
            {trailer &&
                <iframe src={`https://www.youtube.com/embed/${trailer}`}
                    title="YouTube video player" frameBorder="0"
                    height="50vw" width="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
            }
        </div>
    );
});