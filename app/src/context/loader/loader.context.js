import { createContext, useState } from "react";
import { Loader } from "../../components/loader/loader";
import "./loader.context.css";

const DEFAULT_VALUE = false;

const LoaderContext = createContext({
  isLoading: DEFAULT_VALUE,
  executeWithLoading: async () => {},
});

function LoaderContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(DEFAULT_VALUE);

  return (
    <LoaderContext.Provider
      value={{
        isLoading: isLoading,
        executeWithLoading: async (promise) => {
          setIsLoading(true);
          const result = await promise;
          setIsLoading(false);
          return result;
        },
      }}
    >
      {isLoading && (
        <div className="LoaderContext">
          <Loader />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export { LoaderContext, LoaderContextProvider };
