'use strict';

import * as React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, RootState } from '../../app/store';
import store from '../../app/store';
import Track from './Track';
import Loading from './Loading';
import PlayButton from './PlayButton';
import { Slider } from './Slider';
import {
    // actions
    playThunk,
    pauseThunk,
    setTempo,
    clearAllPads,

    selectNBars,
    selectBeatsPerBar,
    selectPadsPerBeat,
    selectInstrumentsEnabledForPad,
} from './sequencerSlice';
import {
    addInstrument,

    selectInstrumentNames,
} from '../instruments/instrumentsSlice';
import {
    FirstToneInstrument,
    TonePlayer,
    Conjunction,
} from '../instruments/classes/toneInstruments';
import instrumentPlayer from '../instruments/instrumentPlayer';
import { useKeyboardShortcut } from '../../util/useKeyboardShortcut';

function StepSequencer() {
    // React state for loading
    const [isLoading, setLoading] = React.useState(true);

    // Custom React Hooks for Redux state (?)
    const nBars = useSelector(selectNBars);
    const beatsPerBar = useSelector(selectBeatsPerBar);
    const padsPerBeat = useSelector(selectPadsPerBeat);
    const tempo = useSelector((state: RootState) => state.sequencer.tempo);
    const isPlaying = useSelector((state: RootState) => state.sequencer.isPlaying);
    const instrumentNames = useSelector(selectInstrumentNames);
    const dispatch = useAppDispatch();

    // init audio and instruments
    React.useEffect(() => {
        let isMounted = true;

        // initialize instrumentPlayer with instruments
        (async () => {
            await instrumentPlayer.init(tempo);

            dispatch(setTempo(99));
            dispatch(addInstrument('hat', new TonePlayer('/assets/audio/hat.wav')));
            dispatch(addInstrument('lazertom', new TonePlayer('/assets/audio/lazertom.wav')));
            dispatch(addInstrument('electrotom', new TonePlayer('/assets/audio/electrotom.wav')));
            dispatch(addInstrument('snare', new TonePlayer('/assets/audio/snare.wav')));
            dispatch(addInstrument('kicksynth', new Conjunction(
                new TonePlayer('/assets/audio/kick.wav'),
                new FirstToneInstrument()
            )));
            dispatch(addInstrument('kickreverse', new TonePlayer('/assets/audio/kick.wav').reverse()));

            await instrumentPlayer.getTone().loaded();

            if (isMounted) {
                setLoading(false);
            }
         })();

         return () => { isMounted = false; }
    }, []); // empty array so this hook only runs once, on mount

    // Set up Tone.Loops for given time signature
    React.useEffect(() => {
        instrumentPlayer.setUpLoops(
            nBars,
            beatsPerBar,
            padsPerBeat,
            (bari, beati, padi) => selectInstrumentsEnabledForPad(store.getState(), bari, beati, padi));
    }, [nBars, beatsPerBar, padsPerBeat])

    // Play/Pause functionality for 'Space' key and the Play button
    const playpause = () => isPlaying ? dispatch(pauseThunk) : dispatch(playThunk);
    useKeyboardShortcut([' '], playpause);

    if (isLoading) {
        return (<Loading/>);
    }

    return (
        <section className={'stepSequencer'}>
            <section className={'sequencerControls'}>
                <span>
                    <Slider
                        {...{name: "bpm", min: 10, max: 200, value: tempo, step: 1}}
                        onInput={(newTempoValue) => dispatch(setTempo(newTempoValue))}
                    />

                    <PlayButton
                        isPlaying={isPlaying}
                        onClick={playpause}
                    />

                    <button
                        onClick={() => dispatch(clearAllPads())}
                    >
                        Clear All
                    </button>
                </span>
            </section>

            <section className={'tracks'}>
                {instrumentNames.map((instrumentName) => (
                    <Track
                        key={instrumentName}
                        instrumentName={instrumentName}
                    />
                ))}
            </section>
        </section>
    );

}

export default StepSequencer;
