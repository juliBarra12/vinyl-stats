const button = document.querySelector("#recognize");

button.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
    });

    const recorder = new MediaRecorder(stream);
    const chuncks = [];

    recorder.ondataavailable = (event) => {
        chuncks.push(event.data);
    };

    recorder.start();

    setTimeout(() => {
        recorder.stop()
    }, 10000);

    recorder.onstop = async () => {
        const audioBlob = new Blob(chuncks, {
            type: recorder.mimeType,
        });

        const formData = new FormData();
        formData.append("audio", audioBlob);

        const response = await fetch("http://localhost:3000/recognition", 
            {
                method: "POST",
                body: formData,
            }
        );

        const track = await response.json();

        console.log(track);
    };
});