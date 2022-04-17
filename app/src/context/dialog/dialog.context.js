import { createContext, useState } from "react";
import { Objects } from "../../utils/object.utils";
import "./dialog.context.css";

const DEFAULT_VALUE = false;

const DialogContext = createContext({
  isDisplaying: DEFAULT_VALUE,
  display: () => {},
  hide: () => {},
  setOnDisplayListenner: (func) => {},
  setOnHideListenner: (func) => {},
});

function DialogContextProvider({ children }) {
  const [isDisplaying, setIsDisplaying] = useState(DEFAULT_VALUE);
  const [onHide, setOnHide] = useState(() => () => {});
  const [onDisplay, setOnDisplay] = useState(() => () => {});
  const [element, setElement] = useState(null);

  return (
    <DialogContext.Provider
      value={{
        isDisplaying: isDisplaying,
        display: (element) => {
          setIsDisplaying(true);
          setElement(element);
          onDisplay();
        },
        hide: () => {
          setIsDisplaying(false);
          setElement(null);
          onHide();
        },
        setOnHideListenner: (func) => {
          if (Objects.isNotEmpty(func)) {
            setOnHide(func);
          }
        },
        setOnDisplayListenner: (func) => {
          if (Objects.isNotEmpty(func)) {
            setOnDisplay(func);
          }
        },
      }}
    >
      {isDisplaying && (
        <div className="DialogContext">
          <div className="DialogElement">{element}</div>
        </div>
      )}
      {children}
    </DialogContext.Provider>
  );
}

export { DialogContext, DialogContextProvider };
