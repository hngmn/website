'use strict';

import { put, takeEvery, all, select } from 'redux-saga/effects';

import {
    play,
    advanceNote,

    selectIsPlaying,
    selectTempo,
    selectCurrentNote,
} from './sequencerSlice';

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// for cross browser compatibility
export function initAudio() {
    audioCtx = audioCtx || new AudioContext();

    return audioCtx;
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Constants
const LOOKAHEAD = 25.0; // How frequently to call scheduling function (in ms)
const SCHEDULEAHEADTIME = 0.1; // How far ahead to schedule audio (sec)

function* playAsync() {
    console.log('playAsync');

    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    scheduler(audioCtx.currentTime)();
}

/**
 * Given the starting nextNoteTime, return a closure 
 */
function scheduler(nextNoteTime) {
    let timerId = null;

    // TODO: scheduleNote and how to pause/stop the timeout
    return function*() {
        const isPlaying = yield(select(selectIsPlaying));
        console.log(`scheduler running. isPlaying=${isPlaying}`);
        if (!isPlaying) {
            window.clearTimeout(timerId);
        }

        const tempo = yield(select(selectTempo));
        const secondsPerBeat = 60.0 / tempo;

        const intervalEnd = audioCtx.currentTime + SCHEDULEAHEADTIME;

        while (nextNoteTime < intervalEnd) {
            scheduleNoteCallback(currentNote, nextNoteTime);
            yield put(advanceNote());
            nextNoteTime += LOOKAHEAD
        }

        timerId = window.setTimeout(scheduler(nextNoteTime), LOOKAHEAD);
        console.log(`timer set with id=${timerId}`);
    }
}

function scheduleNoteCallback(currentNote, nextNoteTime) {
    console.log(`scheduleNoteCallback called with ${currentNote}, ${nextNoteTime}`);
}

function* watchPlay() {
    yield takeEvery(play().type, playAsync);
}

export default function* rootSaga() {
    yield all([
        watchPlay(),
    ])
}
