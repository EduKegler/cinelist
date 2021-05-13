import React from "react";
import { useParams } from "react-router";
import { client } from "../../client";
import './movie.scss';
import youtube from '../../../assets/images/youtube.png';
import disney from '../../../assets/images/disney.png';
import netflix from '../../../assets/images/netflix.png';
import amazon from '../../../assets/images/amazon.png';

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


    console.log(providers);

    const hasOnAmazon = providers.find(provider => provider.provider_name === 'Amazon Prime Video') ? true : false;
    const hasOnNetFlix = providers.find(provider => provider.provider_name === 'Netflix') ? true : false;
    const hasOnYoutube = providers.find(provider => provider.provider_name === 'YouTube') ? true : false;
    const hasOnDisney = providers.find(provider => provider.provider_name === 'Disney Plus') ? true : false;

    console.log(hasOnAmazon, hasOnNetFlix, hasOnYoutube, hasOnDisney)

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
                        {hasOnAmazon && <img src={amazon} alt='amazon' width={100} />}
                        {hasOnDisney && <img src={disney} alt='disney' width={100} />}
                        {hasOnNetFlix && <img src={netflix} alt='netflix' width={100} />}
                        {hasOnYoutube && <img src={youtube} alt='youtube' width={100} />}
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