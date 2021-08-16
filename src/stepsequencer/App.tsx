'use strict';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';
import { RootState, useAppDispatch } from './app/store';
import instrumentPlayer from './features/instruments/instrumentPlayer';
import {
    fetchDbInstrumentIds,
    initializeDefaultInstruments,
    fetchSequencerInstruments,

    selectDbFetchStatus,
} from './features/instruments/instrumentsSlice';
import Loading from './features/sequencer/Loading';
import StepSequencer from './features/sequencer/StepSequencer';
import InstrumentBuilder from './features/instruments/InstrumentBuilder';

function App() {
    const dispatch = useAppDispatch();
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        // fetch
        (async () => {
            await dispatch(fetchSequencerInstruments());
            dispatch(fetchDbInstrumentIds())
                .unwrap()
                .then((result) => {
                    if (result.length === 0) {
                        console.log('found no instruments in db. initializing default instruments');
                        dispatch(initializeDefaultInstruments());
                    }
                });

            await instrumentPlayer.getTone().loaded();


            setLoaded(true);
         })();
    }, []);

    const dbFetchStatus = useSelector(selectDbFetchStatus);

    return (
        <Tabs>
            <TabList>
                <Tab>Sequencer</Tab>
                <Tab>Instrument Builder</Tab>
            </TabList>

            <TabPanel>
                <Loading
                    status={dbFetchStatus}
                    ready={loaded}
                >
                    <StepSequencer/>
                </Loading>
            </TabPanel>

            <TabPanel>
                <Loading
                    status={dbFetchStatus}
                    ready={loaded}
                >
                    <InstrumentBuilder/>
                </Loading>
            </TabPanel>
        </Tabs>
    );
}

export default App;
