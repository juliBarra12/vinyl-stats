import type { RecognizedTrack } from "../types/recognizedTrack.ts";


export class RecognitionService {
    async recognizeTrack(audio: Blob): Promise<RecognizedTrack | null>  {
        // Implement the logic to recognize the track from the audio buffer 
        const formData = new FormData()
        formData.append("api_token", process.env.AUDD_API_KEY as string);
        formData.append("file", audio, "audio.mp3");
        formData.append("return", "timecode,apple_music,spotify");
        
        console.log("Reached recognition service");
        const response = await fetch("https://api.audd.io/", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        console.log(response.status);
        console.log("Response: ", data);
        if(data.result) {
            console.log(`${data.result.artist} - ${data.result.title} - Album: ${data.result.album} - Release Date: ${data.result.release_date}`);
            return {
            title: data.result.title,
            artist: data.result.artist
        }
        } else {
            console.log("Song not recognized");
            return null;
        }

    }

}

