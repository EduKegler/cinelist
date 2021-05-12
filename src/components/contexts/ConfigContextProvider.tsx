import React, { useContext } from "react";
import { createContext } from "react";
import { client } from "../../api/client";

type Genre = {
    id: number,
    name: string
}
type ConfigContextData = {
    genres: Genre[];
    getGenreById: (id: number) => string;
}

type ConfigContextProps = {
    children: React.ReactNode;
}

export const ConfigContext = createContext({} as ConfigContextData);

export const ConfigContextProvider = React.memo((props: ConfigContextProps)=> {

    const [genres, setGenre] = React.useState<Genre[]>([]);

    const fetchGenres = async () => {
        try {
            const { data } = await client().get('/genre/movie/list')
            setGenre(data.genres);
        } catch (err) {
            console.error(err);
        }
    }

    const getGenreById = (id: number) => genres.find(genre => genre.id === id)?.name ?? '';

    React.useEffect(() => { fetchGenres(); }, [])

    return (
        <ConfigContext.Provider
            value={{ genres, getGenreById }}
        >
            {props.children}
        </ConfigContext.Provider>
    )
});

export const useConfig = () => useContext(ConfigContext);