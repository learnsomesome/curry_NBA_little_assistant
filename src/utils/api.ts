import { AxiosRequestConfig } from 'axios';
import instance from './axios';

type Meta = {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}

export type Player = {
  id: number;
  first_name: string;
  last_name: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  position: string;
  team: Team;
}

interface AllPlayersParams {
  page?: number;
  per_page?: number;
  search?: string;
}

interface AllPlayersRes {
  data: Player[];
  meta: Meta;
}

export const getAllPlayers = (params: AllPlayersParams, isLoading: boolean): Promise<AllPlayersRes> => 
  instance.get('/players', {params, headers: {isLoading}});

export type Team = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

interface AllTeamsRes {
  data: Team[];
  meta: Meta;
}

export const getAllTeams = (): Promise<AllTeamsRes> => instance.get('/teams', {params: {page: 0}});
