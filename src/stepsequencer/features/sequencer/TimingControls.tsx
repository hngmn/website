'use strict';

import classnames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';

import store, { useAppDispatch, RootState } from '../../app/store';
import instrumentPlayer from '../instruments/instrumentPlayer';
import {
    setTempo,

    selectNBars,
    selectBeatsPerBar,
    selectPadsPerBeat,
    selectInstrumentsEnabledForPad,
} from './sequencerSlice';

import BarSwitch from './BarSwitch';
import Slider from './Slider';

export default function TimingControl() {
    const nBars = useSelector(selectNBars);
    const beatsPerBar = useSelector(selectBeatsPerBar);
    const padsPerBeat = useSelector(selectPadsPerBeat);
    const tempo = useSelector((state: RootState) => state.sequencer.tempo);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setTempo(99));
    }, []); // empty array so this hook only runs once, on mount

    // Set up Tone.Loops for given time signature
    React.useEffect(() => {
        console.log('setting up loops');
        instrumentPlayer.setUpLoops(
            nBars,
            beatsPerBar,
            padsPerBeat,
            (bari, beati, padi) => selectInstrumentsEnabledForPad(store.getState(), bari, beati, padi));
    }, [nBars, beatsPerBar, padsPerBeat])

    return (
        <div>
            <Slider
                {...{name: "bpm", min: 10, max: 200, value: tempo, step: 1}}
                onInput={(newTempoValue) => dispatch(setTempo(newTempoValue))}
            />

            <BarSwitch/>
        </div>
    );
}
