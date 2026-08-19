import type { RecognitionService } from "../services/recognition.service.js";

export class RecognitionController {
    constructor(
        private readonly recognitionService: RecognitionService
    ) {}

    async recognize(audio: Blob) {
        return this.recognitionService.recognizeTrack(audio);
    }
}