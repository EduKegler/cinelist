import { client } from "../../api/client";

export const fetchMovieDetails = async (id: number) => await client().get(`/movie/${id}`);
export const fetchMovieProviders = async (id: number) => await client().get(`/movie/${Number(id)}/watch/providers`);
export const fetchMovieCredits = async (id: number) => client().get(`/movie/${Number(id)}/credits`);
export const fetchMovieVideos = async (id: number) => client().get(`/movie/${Number(id)}/videos`)
