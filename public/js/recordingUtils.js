import * as store from './store.js'
let mediaRecorder;

const vp9Codec = 'video/webm; codecs=vp=9';
const vp9Options = {
    MimeType: vp9Codec
}
const recordedChuncks = [];

export const startRecording = () =>
{
    const remoteStream = store.getState().remoteStream;

    if(MediaRecorder.isTypeSupported(vp9Codec))
    {
        mediaRecorder = new MediaRecorder(remoteStream,vp9Options)
    }
    else{
        mediaRecorder = new MediaRecorder(remoteStream);
    }

    mediaRecorder.ondataavailable = handleDataAvailable;

    mediaRecorder.start();
}

export const pauseRecording = () =>
{
    mediaRecorder.pause();
}

export const resumeRecording = () =>
{
    mediaRecorder.resume();
}

export const stopRecording = () =>
{
    mediaRecorder.stop();

}

const downloadRecorderVideo = () =>
{
    const blob = new Blob(recordedChuncks, {
        type: 'video/webm'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    window.URL.revokeObjectURL(url);
}

const handleDataAvailable = (event) =>
{
    if(event.data.size>0)
    {
        recordedChuncks.push(event.data);
        downloadRecorderVideo();
    }


}