import React, { useRef, useState, useEffect } from 'react';
import './CameraCapture.css'; // Custom CSS for styling

const CameraCapture = ({ clueImage, clueText }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);

    useEffect(() => {
        if (cameraActive) {
            // Access the user's camera
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                })
                .catch((error) => {
                    console.error("Error accessing camera: ", error);
                    setCameraActive(false);
                });
        }
    }, [cameraActive]);

    const handleCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw the clue image overlay on the captured photo
        if (clueImage) {
            const img = new Image();
            img.src = clueImage;
            img.onload = () => {
                const overlayWidth = 100; // Adjust as needed
                const overlayHeight = 100;
                ctx.drawImage(img, canvas.width - overlayWidth - 10, 10, overlayWidth, overlayHeight);
            };
        }

        // Draw the clue text overlay on the captured photo
        if (clueText) {
            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(clueText, 10, canvas.height - 30); // Adjust positioning as needed
        }

        // Set the captured image
        setCapturedImage(canvas.toDataURL("image/png"));
    };

    const handleStopCamera = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setCameraActive(false);
    };

    return (
        <div className="camera-capture-container">
            {cameraActive ? (
                <div className="camera-wrapper">
                    {/* Live video preview */}
                    <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }} />

                    {/* Overlay Clue Image */}
                    {clueImage && (
                        <img src={clueImage} alt="Clue Overlay" className="clue-overlay-image" />
                    )}

                    {/* Overlay Clue Text */}
                    {clueText && (
                        <div className="clue-overlay-text">{clueText}</div>
                    )}

                    <button onClick={handleCapture}>Capture</button>
                    <button onClick={handleStopCamera}>Stop Camera</button>
                </div>
            ) : (
                <button onClick={() => setCameraActive(true)}>Start Camera</button>
            )}

            <canvas ref={canvasRef} style={{ display: "none" }} />

            {capturedImage && (
                <div>
                    <h3>Captured Image</h3>
                    <img src={capturedImage} alt="Captured Selfie" style={{ width: "100%", height: "auto" }} />
                </div>
            )}
        </div>
    );
};

export default CameraCapture;
