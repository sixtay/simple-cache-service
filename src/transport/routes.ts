import { Request, Response } from "express";
import Cache, { CacheItem } from "../services/cache";

const cache: Cache = Cache.getInstance(86400);
/**
 * Login page.
 * @route GET /login
 */
 export const getItem = (req: Request, res: Response): void => {
  const item = cache.get(req.body.k);
  res.json(_standardResponse(item));
};

export const setItem = (req: Request, res: Response): void => {
  console.log({body: req.body});
  console.log({params: req.params});
  const item = cache.set(req.body.k, req.body.v);
  res.json(_standardResponse());
};

export const deleteItem = (req: Request, res: Response): void => {
  const item = cache.get(req.body.k);
  res.json(item);
};

export const flush = (req: Request, res: Response): void => {
  cache.flush();
  res.json(_standardResponse());
};

export const getCacheLength = (req: Request, res: Response): void => {
  const item = cache.size();
  res.json(_standardResponse({size: item}));
};

const _standardResponse = (data?: CacheItem["value"], status: boolean = true, error: {message: string, code: number} | boolean  = false): {success: boolean, payload?: any, error?: any} => {
  return {
    success: status,
    payload: data,
    error,
  };
};