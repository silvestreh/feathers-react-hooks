import { useContext, useEffect, useState } from 'react'
import { useService } from '../useService'
import { Context } from '../provider'
import { handlePatch } from '../utils'

export const useGet = (serviceName: string, id: string, params: FParams) => {
  const service: FService = useService(serviceName);
  const idField: string = useContext(Context).idField;
  const [result, setResult] = useState<FResponse>({ total: 0, limit: 0, skip: 0, data: [] });
  const [hasError, setHasError] = useState<object|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hp: Function = (patched: object) => handlePatch(patched, result, idField, setResult);

  service.on('patched', hp)
  service.on('updated', hp)

  useEffect(() => {
    setIsLoading(true)

    service.get(id, params).then((res: object) => {
      setResult({ total: 1, limit: 1, skip: 0, data: [res] })
      setHasError(null)
    }).catch((e: object) => {
      setHasError(e)
      console.error(e)
    }).finally(() => {
      setIsLoading(false)
    })

    return () => {
      service.off('patched', hp)
      service.off('updated', hp)
    }
  }, [id])

  return {
    result: result.data[0],
    isLoading,
    hasError
  }
}
