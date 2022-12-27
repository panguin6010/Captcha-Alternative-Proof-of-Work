import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tasks = [  {    id: 1,    description: 'Take a photo of a stop sign',    verificationMethod: 'photo',  },  {    id: 2,    description: 'Solve this math problem: 3 + 7 = ?',    verificationMethod: 'text',    answer: '10',  },  {    id: 3,    description: 'Draw a picture of a cat',    verificationMethod: 'photo',  },  // Add more tasks here];

const ProofOfWork = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [proof, setProof] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      // Start the countdown timer
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(intervalId);
            return null;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedTask]);

  const handleTaskSelect = (event) => {
    const selectedTask = tasks.find((task) => task.id === event.target.value);
    setSelectedTask(selectedTask);
    setTimeLeft(60); // Set the timer to 60 seconds
  };

  const handleProofChange = (event) => {
    setProof(event.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!selectedTask) {
      errors.task = 'A task must be selected';
    }
    if (!proof) {
      errors.proof = 'A proof must be provided';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Verify the proof using the image tagging API
const result = await verifyProof(selectedTask, proof);
setVerificationResult(result);
}
setIsLoading(false);
};

return (
<form onSubmit={handleSubmit}>
<label>
Task:
<select id="task-select" onChange={handleTaskSelect}>
<option value="">Select a task</option>
{tasks.map((task) => (
<option key={task.id} value={task.id}>
{task.description}
</option>
))}
</select>
{errors.task && <p>{errors.task}</p>}
</label>
<br />
{selectedTask && (
<>
{selectedTask.verificationMethod === 'photo' && (
<label>
Proof:
<input
             type="file"
             value={proof}
             onChange={handleProofChange}
           />
{errors.proof && <p>{errors.proof}</p>}
</label>
)}
{selectedTask.verificationMethod === 'text' && (
<label>
Proof:
<input
             type="text"
             value={proof}
             onChange={handleProofChange}
           />
{errors.proof && <p>{errors.proof}</p>}
</label>
)}
<br />
{isLoading ? (
<p>Verifying...</p>
) : (
<button type="submit">Submit</button>
)}
</>
)}
{timeLeft !== null && (
<p>Time left: {timeLeft} seconds</p>
)}
{verificationResult && (
<p>Verification result: {verificationResult}</p>
)}
</form>
);
};

async function verifyProof(task, proof) {
if (task.verificationMethod === 'photo') {
// Use the image tagging API to verify the photo
try {
const response = await axios.post('/verify-photo', {
photo: proof,
});
return response.data.result;
} catch (error) {
return 'Error verifying photo';
}
} else if (task.verificationMethod === 'text') {
// Compare the proof to the expected answer to verify the text
return task.answer === proof ? 'Success' : 'Incorrect answer';
}
}

ReactDOM.render(<ProofOfWork />, document.getElementById('root'));
