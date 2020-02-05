import { useContext, useEffect, useState } from 'react';
import { useService } from '../useService';
import { Context } from '../provider';
import { handleCreate, handlePatch, handleRemove } from '../utils';

export const useFind = (serviceName: string, params: FParams = { query: {} }) => {
  const service: FService = useService(serviceName);
  const idField: string = useContext(Context).idField;
  const [result, setResult] = useState<FResponse>({ total: 0, limit: 0, skip: 0, data: [] });
  const [hasError, setHasError] = useState<object|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<object>(params.query || {});
  const hc: Function = (created: object) => handleCreate(created, result, query, idField, setResult);
  const hp: Function = (patched: object) => handlePatch(patched, result, idField, setResult);
  const hr: Function = (removed: object) => handleRemove(removed, result, idField, setResult);

  service.on('created', hc);
  service.on('patched', hp);
  service.on('updated', hp);
  service.on('removed', hr);

  useEffect(() => setQuery(params.query || {}), [params.query]);

  useEffect(() => {
    setIsLoading(true);

    service.find(params).then((result: FResponse) => {
      setResult(result);
      setHasError(null);
    }).catch((e: object) => {
      setHasError(e);
      console.error(e);
    }).finally(() => {
      setIsLoading(false);
    })

    return () => {
      service.off('created', hc);
      service.off('patched', hp);
      service.off('updated', hp);
      service.off('removed', hr);
    }
  }, [query]);

  return { result, isLoading, hasError };
};
