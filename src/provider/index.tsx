import React, { createContext, useContext, useMemo } from 'react';

export const Context = createContext({ feathers: {}, idField: 'id' });
export const useFeathers = () => useContext(Context).feathers;

export const Provider = ({
  feathers,
  children,
  idField = 'id'
}: { feathers: any, children: object[], idField: string }) => {
  if (!feathers) {
    throw new Error('A feathers client is required!');
  }

  const value = useMemo(() => {
    return { feathers, idField }
  }, [feathers, idField]);

  return (
    <Context.Provider
      value={value}
      children={children} />
  );
};
