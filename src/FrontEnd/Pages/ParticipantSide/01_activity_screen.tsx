import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Draggable from 'react-draggable';


type Note = {
    type: number;
    x: number;
    y: number;
  };

function ParticipantActivityScreen() {
  const location = useLocation();
  const userId = location.state?.userId;
  console.log("userId: " + userId);

//   const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const types = [0, 1, 2, 3, 4, 5];

  const handleNoteDrag = (index: number, position:{ x: number; y: number }) => {
    const { x, y } = position;
    let snappedY = Math.round(y / 25) * 25; // Snap to 25-pixel increments
    // set boundary for the note
    if (snappedY < 175) { 
        snappedY = 175;
    }
    if (snappedY > 375) {
        snappedY = 375;
    }
    const newNotes = [...notes];
    newNotes[index].y = snappedY;
    setNotes(newNotes);
  };

  const addNote = (noteType: number) => {
    let currNoteCnt = notes.length;
    if (currNoteCnt === 0) {
      if (noteType === 3) {
        setNotes([{ x: 70, y: 225, type: noteType }]);
      } else if (noteType === 4) {
        setNotes([{ x: 70, y: 250, type: noteType }]);
      } else if (noteType === 5) {
        setNotes([{ x: 70, y: 275, type: noteType }]);
      } else {
        setNotes([{ x: 70, y: 350, type: noteType }]);
      }
    } else if (currNoteCnt < 4) {
      const newNotes = [...notes];
      if (noteType === 3) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 225, type: noteType }]);
      } else if (noteType === 4) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 250, type: noteType }]);
      } else if (noteType === 5) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 275, type: noteType }]);
      } else {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 350, type: noteType }]);
      }
    }
  };
  

  const resetMeasure = () => {
    setNotes([]);
  }

  function deleteLastNote() {
    setNotes(prevNotes => prevNotes.slice(0, -1));
  }

  const getNoteSymbol = (type: number) => {
    switch (type) {
      case 0: return '𝅝'; // Full note
      case 1: return '𝅗𝅥'; // Half note
      case 2: return '𝅘𝅥'; // Quarter note
      case 3: return '𝄻'; // Full rest
      case 4: return '𝄼'; // Half rest
      case 5: return '𝄽'; // Quarter rest
      default: return '';
    }
  };

  return (
    <div className="music-staff">
        {/* Render staff lines */}
        <div className="staff">
            {[...Array(5)].map((_, idx) => (
            <div key={idx} className="staff-line" />
            ))}
        </div>
        {/* <div className="note">{getNoteSymbol(6)}</div> */}
        {/* Render draggable note */}
        {notes.map(({ x, y, type }, index) => (
            (type < 3 || type > 5) ? 
            <Draggable
            key={index}
            axis="y"
            bounds="parent"
            position={{ x, y }}
            onDrag={(e, position) => handleNoteDrag(index, position)}
            >
            <div className="note">{getNoteSymbol(type)}</div>

            </Draggable> : <Draggable
            key={index}
            axis="y"
            bounds="parent"
            position={{ x, y }}
            onDrag={(e, position) => handleNoteDrag(index, position)}
            disabled={true}
            >
            <div className="note">{getNoteSymbol(type)}</div>

            </Draggable>
        ))}

        {/* Render buttons */}
        <div className="note-buttons">
            {types.map((note, index) => (
            <button key={index} onClick={() => addNote(note)} style={{ marginRight: '10px' }}>
                {/* <img src={`img${note+1}.png`} alt="Note icon" style={{ width: '50px', height: '50px' }}/> */}
                <img src={process.env.PUBLIC_URL + `/notes/img${note+1}.png`} alt="Note icon" style={{ width: '50px', height: '50px' }}/>

                {note+1}
            </button>
            ))}
        </div>
        <div className="button-container" style={{ marginTop: '20px' }}>
            <div className="reset-button">
                <button onClick={() => deleteLastNote()} style={{ fontSize: '20px', padding: '10px 20px' }}>
                    Delete
                </button>
            </div>

            <div className="reset-button">
                <button onClick={() => resetMeasure()} style={{ fontSize: '20px', padding: '10px 20px' }}>
                    Reset
                </button>
            </div>
            
        </div>
        <div className="submit-button">
                <button onClick={() => resetMeasure()} style={{ fontSize: '20px', padding: '10px 20px' }}>
                    Submit
                </button>
        </div>
    </div>

  );
}

export default ParticipantActivityScreen;