import torch
import torchaudio
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import io

# Load model and processor once [2b.ii) WhisperProcessor is used to pre-process the audio]
processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
forced_decoder_ids = processor.get_decoder_prompt_ids(language="english", task="transcribe")


# Move model to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

# Transcribes an MP3 audio file using Whisper Tiny.
def transcribe_audio(file: bytes) -> str:
    # Load audio file using torchaudio with soundfile backend
    waveform, sample_rate = torchaudio.load(io.BytesIO(file))

    # Resample to 16kHz (limit required by Whisper)
    if sample_rate != 16000:
        resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
        waveform = resampler(waveform)

    # Prepare input for Whisper
    input_features = processor(waveform.squeeze().numpy(), sampling_rate=16000, return_tensors="pt").input_features
    input_features = input_features.to(device)

    # Transcribe using Whisper
    predicted_ids = model.generate(input_features, forced_decoder_ids=forced_decoder_ids)
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    return transcription