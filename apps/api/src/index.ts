import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import { RecognitionService } from "./services/recognition.service.js";
import { RecognitionController } from "./controllers/recognition.controller.js";

const app = express();
const upload = multer();

const recognitionService = new RecognitionService();
const recognitionController = new RecognitionController(recognitionService);

app.use(cors());

app.use(express.json());


app.post(
    "/recognition", 
    upload.single("audio"),
    async (req, res) => {
        try{
            if(!req.file) {
                res.status(400).json({
                    error: "Audio file is required",
                });
                return;
            }

            const audioBlob = new Blob(
                [new Uint8Array(req.file.buffer)],
                { type: req.file.mimetype }
            );
            const result = await recognitionController.recognize(audioBlob);
            if(!result){
                res.status(404).json({
                    error: "Track could not be recognized",
                });
                return;
            }

            res.json(result);
        } catch(error) {
            console.error(error);

            res.status(500).json({
                error: "Recognition failed",
            });
        }
    }
);


app.listen(3000, () => {
    console.log("API running on http://localhost:3000");
});