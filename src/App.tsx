import React from 'react';
import { Header } from './components/Header';
import {
  Route,
  BrowserRouter,
  Redirect,
  HashRouter,
  useLocation,
} from 'react-router-dom';

import { UserProfile } from './components/User/UserProfile';

import styles from './app.module.scss';
import { SectorContext, SECTOR } from './context/SectorContext';

import { StockPage } from './pages/StockPage';
import { SymbolsContext } from './context/SymbolsContext';

const Main = () => {
  const locations = useLocation();
  return (
    <>
      <Route path={"/profile"}>
        <UserProfile />
      </Route>
      <Route path={["/stocks/:symbol?"]}  >
        <Header />
        <StockPage />
      </Route>
      {locations.pathname === '/' ? <Redirect to="/stocks" /> : null}
    </>
  )
}

const App: React.FunctionComponent<any> = () => {
  const selectedSymbols = React.useRef<string[]>(["SNAP"]);
  const [symbols, setSymbols] = React.useState<any>({
    [SECTOR.SP500]: ['SYK', "GILD", "DHR", "CVS", "BMY", "TMO", "SNY"],
    [SECTOR.TECHNOLOGY]: ['TWTR', 'AAPL', "MSFT", "SNAP", "NVDA", "CSCO"]
  })
  const [sector, setSector] = React.useState<SECTOR>(SECTOR.TECHNOLOGY);


  const handleSectorChange = React.useCallback(
    (value: SECTOR) => { setSector(value); },
    [setSector]
  )

  const handleSymbolsChange = React.useCallback(
    (value: string[]) => { setSymbols({ ...symbols, [sector]: value }); },
    [setSymbols, sector, symbols]
  )

  const handleSelectedSymbolsChange = React.useCallback(
    (value: [string]) => { selectedSymbols.current = value; },
    [selectedSymbols]
  )

  const handleSymbolsRemove = React.useCallback(
    () => {
      const newSymbols = symbols[sector].filter((s: string) => !selectedSymbols.current.some((x) => x === s));
      selectedSymbols.current = [];
      setSymbols({ ...symbols, [sector]: newSymbols })
    },
    [setSymbols, symbols, sector]
  );

  return (
    <div className="App">
        <SymbolsContext.Provider value={{
          selectedSymbols,
          symbols, onSymbolsChange: handleSymbolsChange,
          onSelectedSymbolsChange: handleSelectedSymbolsChange,
          onSymbolsRemove: handleSymbolsRemove
        }}>
          <SectorContext.Provider value={{ sector, onSectorChange: handleSectorChange }}>
              <HashRouter>
                <main className={styles.main}>
                  <Main />
                </main>
              </HashRouter>
          </SectorContext.Provider>
        </SymbolsContext.Provider>
    </div>
  );
}

export default App;
